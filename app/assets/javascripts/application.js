// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
// = require bundle.js
//
// //Override the default confirm dialog by rails
// $.rails.allowAction = function(link){
//   if (link.data("confirm") == undefined){
//     return true;
//   }
//   $.rails.showConfirmationDialog(link);
//   //return false;
// }
// //User click confirm button
// $.rails.confirmed = function(link, message){
//   link.data("confirm", null);
//   link.trigger("click.rails");
//   link.data("confirm", message);
// }
// //Display the confirmation dialog
// $.rails.showConfirmationDialog = function(link){
//   var message = link.data("confirm");
//   bootbox.confirm({
//       size:    'small',
//       message:  message,
//       callback: function(result) {
//         if (result)
//           $('body').block();
//           $('body').spin('huge');
//           $.rails.confirmed(link, message);
//       }
//     });
// }
