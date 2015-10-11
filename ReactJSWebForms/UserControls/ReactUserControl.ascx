<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ReactUserControl.ascx.cs" Inherits="ReactJSWebForms.UserControls.ReactUserControl" %>


<!-- Render the component Server Side -->
<%=SlideshowHtml%>

<!-- Initialise the component in JavaScript too to help with event binding -->
<script src="http://fb.me/react-with-addons-0.13.1.min.js"></script>
<%= Scripts.Render("~/bundles/ReactComponents") %>
<%=SlideshowJS%>
