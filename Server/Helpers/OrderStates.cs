using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Helpers
{
    public static class OrderStates
    {
      public static readonly State NewOrder = new State(0, "Nowe");
      public static readonly State Commissioned = new State(1, "Zlecone");
      public static readonly State Paid = new State(2, "Opłacone");
      public static readonly State Finished = new State(3, "Gotowe");
      public static readonly State Ended = new State(4, "Zakończone");
  }

  public struct State
  {
    private int _id;
    private string _name;

    public State(int id, string name = null)
    {
      _id = id;
      _name = name;
    }
  }

}
