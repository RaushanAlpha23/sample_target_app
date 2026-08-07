from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db
from models import CartItem, Product

router = APIRouter()

class CartAddRequest(BaseModel):
    product_id: int
    quantity: int

@router.post("/api/cart/add")
def add_to_cart(req: CartAddRequest, db: Session = Depends(get_db)):
    item = db.query(CartItem).filter(CartItem.product_id == req.product_id).first()
    if item:
        item.quantity += req.quantity
        return {"status": "updated"}
    else:
        new_item = CartItem(product_id=req.product_id, quantity=req.quantity)
        db.add(new_item)
        db.commit()
        return {"status": "added"}

@router.get("/api/cart")
def get_cart(db: Session = Depends(get_db)):
    items = db.query(CartItem).all()
    result = []
    
    for item in items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if product:
            result.append({
                "id": item.id,
                "product_id": item.product_id,
                "price": f"{product.base_price:.2f}",
                "quantity": item.quantity
            })
            
    return {"items": result, "total_items": len(items)}