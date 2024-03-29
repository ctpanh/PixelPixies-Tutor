from fastapi import APIRouter, Depends, Response
from controllers.markingController import MarkingController
from sqlalchemy.orm import Session
from database import getDatabase
from fastapi import FastAPI, File, UploadFile
from controllers.userController import verifyToken

from models.user import UserModel
from models.question_list import QuestionType
from controllers.pdfController import PDFController
from controllers.roadmapController import RoadMapController
from schemas.roadmapSchema import CreateRoadmap


router = APIRouter(
    tags=["Roadmap"],
    prefix="/Roadmap",
    responses={404: {"description": "Not found"}},
)


@router.post("/create")
def create_roadmap(
    roadmap: CreateRoadmap,
    db: Session = Depends(getDatabase),
    current_user: UserModel = Depends(verifyToken),
):
    return RoadMapController.create_roadmap(
        topic=roadmap.topic, time=roadmap.time, db=db, current_user=current_user
    )
