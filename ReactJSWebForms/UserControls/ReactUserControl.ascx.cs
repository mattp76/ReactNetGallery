using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using React;
using Newtonsoft.Json;
using System.IO;

namespace ReactJSWebForms.UserControls
{
    public partial class ReactUserControl : System.Web.UI.UserControl
    {

        public string GalleryHtml { get; set; }
        
        protected void Page_Load(object sender, EventArgs e)
        {

            var env = AssemblyRegistration.Container.Resolve<IReactEnvironment>();
            var objectModel = new { data = LoadJson() };
            var reactComponent = env.CreateComponent("Slideshow", objectModel);


            GalleryHtml = reactComponent.RenderHtml();

        }


        public string LoadJson()
        {
            var path = Server.MapPath(@"~/JSON/GalleryItems.json");
            var json = new JsonSerializer();
            //var data = json.Deserialize<Dictionary<string, Dictionary<string, string>>[]>(jsonStr);


            using (StreamReader r = new StreamReader(path))
            {
                //JsonTextReader reader = new JsonTextReader(r);
                //var data = json.Deserialize<Dictionary<string, Dictionary<string, string>>[]>(reader);

                return r.ReadToEnd();
                //List<Item> items = JsonConvert.DeserializeObject<List<Item>>(json);
            }
        }


    }
}