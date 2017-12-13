public class OrderViewModel {
    public string UserId { get; set; }
    
    public int TotalPrints { get; set; }
    public float TotalPrintsPrice { get; set; }
    public float TotalOrderPrice { get; set; }
    
    public DateTime OrderDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? PaymentDate { get; set; }
    public DateTime? ShippingDate { get; set; }
    
    public int DeliveryTypeId { get; set; }
    public int? DeliveryDataId { get; set; }
    public DeliveryData DeliveryData { get; set; }
    
    public int PaymentTypeId { get; set; }
    public int PaymentStatusId { get; set; }
    
    public bool IsInvoice { get; set; }
    public int? InvoiceDataId { get; set; }
    public InvoiceData InvoiceData { get; set; }
    
    public string AdditionalInfo { get; set; }
    public ICollection<Photo> Photos { get; set; }
    public bool IsNew { get; set; }
    public int Status { get; set; }
}