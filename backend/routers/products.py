from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Product, Discount

router = APIRouter()

@router.get("/api/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).limit(10).all()

@router.get("/api/products/{id}")
def get_product_detail(id: int, db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.id == id).first()

@router.get("/api/products/{id}/pricing")
def get_product_pricing(id: int, db: Session = Depends(get_db)):
    discount = db.query(Discount).filter(Discount.product_id == id).first()
    
    if discount:
        return {"product_id": id, "price": discount.discounted_price, "discount_active": True}
    
    return {"product_id": id, "price": None, "discount_active": False}