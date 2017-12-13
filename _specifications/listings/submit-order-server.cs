// POST api/order/submitOrder
[HttpPost("submitOrder")]
public async Task<IActionResult> SubmitOrder([FromBody] OrderVM orderVM)
 {
  if (!ModelState.IsValid) return BadRequest(ModelState);

   if (orderVM.DeliveryDataId == null && orderVM.DeliveryTypeId != 1)
   {
     _context.DeliveryDatas.Add(orderVM.DeliveryData);
     _context.SaveChanges();
     orderVM.DeliveryDataId = orderVM.DeliveryData.Id;
     orderVM.DeliveryData = null;
   }
...
  var order = Mapper.Map<Order>(orderVM);
   order.PaymentStatusId = setStatus(orderVM);
  foreach (var photo in order.Photos) { _context.Photos.Add(photo); }
  _context.Orders.Add(order);

  var client = await _userManager.Users.Where(e => e.Id == orderVM.UserId)
   .FirstOrDefaultAsync();
   client.OrdersAmount = client.OrdersAmount + 1;
   
  await _context.SaveChangesAsync();
  return new OkObjectResult("Order added correctly!");
}