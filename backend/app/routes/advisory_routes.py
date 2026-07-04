"""Advisory + history endpoints."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import models, schemas
from ..controllers import advisory_controller
from ..database import get_db
from ..dependencies import get_current_user

router = APIRouter(prefix="/api/advisory", tags=["advisory"])


@router.post("/ask", response_model=schemas.QueryOut)
def ask(
    payload: schemas.AskRequest,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    return advisory_controller.ask(db, user, payload)


@router.get("/history", response_model=list[schemas.QueryOut])
def history(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    return advisory_controller.list_history(db, user)


@router.delete("/history/{query_id}", response_model=schemas.MessageResponse)
def delete_one(
    query_id: str,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    advisory_controller.delete_query(db, user, query_id)
    return schemas.MessageResponse(message="Query deleted.")


@router.delete("/history", response_model=schemas.MessageResponse)
def clear_all(
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    n = advisory_controller.clear_history(db, user)
    return schemas.MessageResponse(message="History cleared.", detail=f"{n} records removed.")
