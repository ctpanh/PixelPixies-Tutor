from sqlalchemy import Column, Integer, String, ForeignKey, Text
import database

class PDFModel(database.Base):
    __tablename__ = "PDFs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("Users.id"))
    path = Column(String(100), unique=True)
    gcs_path = Column(String(100), unique=True)
    content = Column(Text, nullable=True)