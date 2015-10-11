using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using React;
using Newtonsoft.Json;
using System.IO;
using ReactJSWebForms.Model;
using System.Web.Mvc;
using IHtmlHelper = System.Web.Mvc.HtmlHelper;

namespace ReactJSWebForms.UserControls
{
    public partial class ReactUserControl : System.Web.UI.UserControl
    {

        public string SlideshowHtml { get; set; }
        public IHtmlString SlideshowJS { get; set; }
       

        protected void Page_Init(object sender, EventArgs e)
        {

            var env = AssemblyRegistration.Container.Resolve<IReactEnvironment>();
            var objectModel = new { data = LoadJson() };
            var reactComponent = env.CreateComponent("SlideshowUC", objectModel);
            var script = env.GetInitJavaScript();


            SlideshowHtml = reactComponent.RenderHtml();
            SlideshowJS = ReactInitJavaScript(script);
            
            

        }


        public static IHtmlString ReactInitJavaScript(string script)
        {

            var tag = new System.Web.Mvc.TagBuilder("script")
            {
                InnerHtml = script
            };

            return new HtmlString(tag.ToString());
        }




        public string LoadJson()
        {


            List<SlideshowItem> SlideshowItems = new List<SlideshowItem>();


            SlideshowItems.Add(new SlideshowItem { SlideType = "slide", Image = "//d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Elle/2014/11/07/47836/Chloe-Moo.jpg?Image=%2fs3%2fdigital-cougar-assets%2fElle%2f2014%2f11%2f07%2f47836%2fChloe-Moo.jpg&AllowUpSizing=False&Height=840&MaxWidth=440&bgcolor=black", ItemIndex = 0, ImageCaption = "Image 1", Name = "Image1", Summary = "Summary1", ImageAltText = "Image1AltText", Title = "Title 1"});
            SlideshowItems.Add(new SlideshowItem { SlideType = "slide", Image = "//d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Elle/2014/11/07/47837/Dasha-Gold.jpg?Image=%2fs3%2fdigital-cougar-assets%2fElle%2f2014%2f11%2f07%2f47837%2fDasha-Gold.jpg&AllowUpSizing=False&Height=840&MaxWidth=440&bgcolor=black", ItemIndex = 1, ImageCaption = "Image 2", Name = "Image2", Summary = "Summary2", ImageAltText = "Image2AltText", Title = "Title 2" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "mrec", Image = "", ItemIndex = 2, ImageCaption = "MREC", Name = "MREC", Summary = "MREC", ImageAltText = "", Title = "" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "slide", Image = "//d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Elle/2014/11/07/47838/Georgia-Gardiner.jpg?Image=%2fs3%2fdigital-cougar-assets%2fElle%2f2014%2f11%2f07%2f47838%2fGeorgia-Gardiner.jpg&AllowUpSizing=False&Height=840&MaxWidth=440&bgcolor=black", ItemIndex = 3, ImageCaption = "Image 3", Name = "Image3", Summary = "Summary3", ImageAltText = "Image3AltText", Title = "Title 3" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "slide", Image = "//d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Elle/2014/11/07/47839/Helen-O-Conner.jpg?Image=%2fs3%2fdigital-cougar-assets%2fElle%2f2014%2f11%2f07%2f47839%2fHelen-O-Conner.jpg&AllowUpSizing=False&Height=840&MaxWidth=440&bgcolor=black", ItemIndex = 4, ImageCaption = "Image 4", Name = "Image4", Summary = "Summary4", ImageAltText = "Image4AltText", Title = "Title 4" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "last", Image = "", ItemIndex = 5, ImageCaption = "Last slide", Name = "Last slide", Summary = "Last slide", ImageAltText = "Last slide", Title = "Last slide" });
            


            var data = JsonConvert.SerializeObject(SlideshowItems);


            return data;
      
        }


    }
}