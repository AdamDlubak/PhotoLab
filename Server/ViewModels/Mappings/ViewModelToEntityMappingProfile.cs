using AutoMapper;
using Server.Models;

namespace Server.ViewModels.Mappings
{
  public class ViewModelToEntityMappingProfile : Profile
  {
    public ViewModelToEntityMappingProfile()
    {
      CreateMap<RegistrationViewModel, User>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));

      CreateMap<User, UsersViewModel>().ReverseMap();
      CreateMap<DeliveryData, UserEditDeliveryViewModel>().ReverseMap();
      CreateMap<InvoiceData, UserEditInvoiceViewModel>().ReverseMap();

      CreateMap<OrderViewModel, Order>().ReverseMap();
    }
  }
}