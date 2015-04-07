var vouchers = [
  {
    "name": "under50",
    "discount": 5.00,
    "totalPriceRequirement": 0.00,
    "itemRequirement": null
  },
  {
    "name": "over50",
    "discount": 10.00,
    "totalPriceRequirement": 50.00,
    "itemRequirement": null
  },
  {
    "name": "over75WithShoes",
    "discount": 15.00,
    "totalPriceRequirement": 75.00,
    "itemRequirement": "Footwear"
  } 
]

module.exports = vouchers;