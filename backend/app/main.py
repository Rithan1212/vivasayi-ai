"""FastAPI application entrypoint."""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import get_settings
from .database import init_db
from .routes import advisory_routes, auth_routes
from .utils.logger import get_logger

settings = get_settings()
logger = get_logger()

app = FastAPI(
    title="VIVASAYI",
    description="AI-powered farmer query support and advisory system.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()
    logger.info("VIVASAYI backend started on %s:%s", settings.HOST, settings.PORT)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled error on %s %s: %s", request.method, request.url.path, exc)
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error.", "detail": str(exc)},
    )


@app.get("/", tags=["meta"])
def root():
    return {
        "name": "VIVASAYI",
        "version": "1.0.0",
        "status": "ok",
        "docs": "/docs",
    }


@app.get("/api/health", tags=["meta"])
def health():
    return {"status": "ok"}


app.include_router(auth_routes.router)
app.include_router(advisory_routes.router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
