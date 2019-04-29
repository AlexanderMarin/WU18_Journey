using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WU18_Journey
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string name, string message, string time)
        {
            await Clients.All.SendAsync("RecieveMessage", name, message, time);
        }
    }
}