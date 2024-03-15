namespace Common
{
    public class ChickenDropOffData : ChickenBasedMessage, IChickenDropOffData
    {
        public int DropOff { get; set; }
    }
}