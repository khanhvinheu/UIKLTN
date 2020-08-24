CKEDITOR.editorConfig = function(config) {
  this.api_url = "https://cdio-angular.herokuapp.com";
  config.extraPlugins = "divarea,youtube";
  config.toolbarGroups = [
    { name: "document", groups: ["mode", "document", "doctools"] },
    { name: "clipboard", groups: ["clipboard", "undo"] },
    {
      name: "editing",
      groups: ["find", "selection", "spellchecker", "editing"]
    },
    { name: "styles", groups: ["styles"] },
    { name: "forms", groups: ["forms"] },
    "/",
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    {
      name: "paragraph",
      groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"]
    },
    { name: "links", groups: ["links"] },
    { name: "insert", groups: ["insert"] },
    { name: "colors", groups: ["colors"] },
    { name: "tools", groups: ["tools"] },
    { name: "others", groups: ["others"] },
    { name: "about", groups: ["about"] }
  ];

  config.removeButtons =
    "Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,CopyFormatting,RemoveFormat,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Link,Unlink,Flash,PageBreak,Smiley,ShowBlocks,About,Save,NewPage,Preview,Print,Templates";

  config.toolbarCanCollapse = true;
  config.filebrowserBrowseUrl = this.api_url + "/assets/ckfinder/ckfinder.html";
  config.filebrowserImageBrowseUrl =
    this.api_url + "/assets/ckfinder/ckfinder.html?type=Images";
  config.filebrowserFlashBrowseUrl =
    this.api_url + "/assets/ckfinder/ckfinder.html?type=Flash";
  config.filebrowserUploadUrl =
    this.api_url +
    "/assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files";
  config.filebrowserImageUploadUrl =
    this.api_url +
    "/assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images";
  config.filebrowserFlashUploadUrl =
    this.api_url +
    "/assets/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash";
  // config.filebrowserBrowseUrl =
  //   this.api_url + "/tool/ckeditor/ckfinder/ckfinder.html";
  // config.filebrowserImageBrowseUrl =
  //   this.api_url + "/tool/ckeditor/ckfinder/ckfinder.html?type=Images";
  // config.filebrowserFlashBrowseUrl =
  //   this.api_url + "/tool/ckeditor/ckfinder/ckfinder.html?type=Flash";
  // config.filebrowserUploadUrl =
  //   this.api_url +
  //   "/tool/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files";
  // config.filebrowserImageUploadUrl =
  //   this.api_url +
  //   "/tool/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images";
  // config.filebrowserFlashUploadUrl =
  //   this.api_url +
  //   "/tool/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash";
//   this.ckeConfig = {
//     height: 400,
//     language: "en",
//     allowedContent: true,
//     toolbar: [
//         { name: "clipboard", items: ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"] },
//         { name: "links", items: ["Link", "Unlink", "Anchor"] },
//         { name: "insert", items: ["Image", "Table", "HorizontalRule", "SpecialChar", "Iframe", "imageExplorer"] }
//     ]
// };
ckconfig = {
  // include any other configuration you want
  extraPlugins: [ this.TheUploadAdapterPlugin ]
};
TheUploadAdapterPlugin(editor) {
  console.log('TheUploadAdapterPlugin called');
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadAdapter(loader, '/image');
  };
}
};


