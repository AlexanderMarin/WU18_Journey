using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WU18_Journey.Areas.Identity.Data;
using WU18_Journey.Models;

[assembly: HostingStartup(typeof(WU18_Journey.Areas.Identity.IdentityHostingStartup))]
namespace WU18_Journey.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
               
            });
        } // Ta bort?
    }
}