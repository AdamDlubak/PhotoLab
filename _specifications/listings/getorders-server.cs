// GET api/photo/getorders
[HttpGet("getOrders")]
public IActionResult GetOrders()
{
  List<Order> ordersList = _context.Orders.Include(c => c.User).ToList();
  List<OrdersViewModel> ordersViewModelList = new List<OrdersViewModel>();

  foreach (var order in ordersList)
  {
    ordersViewModelList.Add(new OrdersViewModel()
    {
      Id = order.Id,
      UserName = order.User.FirstName + " " + order.User.LastName,
      OrderDate = order.OrderDate,
      PrintsAmt = order.TotalPrints,
      TotalOrderPrice = order.TotalOrderPrice,
      Status = order.Status,
      IsNew = order.IsNew
    });
  }
  return new OkObjectResult(ordersViewModelList);
}