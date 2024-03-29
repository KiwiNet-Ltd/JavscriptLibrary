/* INSTALL CODE
<script>
    if (typeof KiwiNet == 'undefined') {
        var script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/gh/KiwiNet-Ltd/JavscriptLibrary@release/KiwiNetLibrary.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }    
</script>
*/

var KiwiNet = (function() {
    var methods = {};
    
    //Get URL Param Function
    methods.getUrlParameter = function(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

/*<script>
    if (typeof KiwiNet != 'undefined') {
        KiwiNet.install_talent_form(document.getElementById('XX'));
    }
</script>*/
    methods.install_talent_form = function(container) {
        jQuery.ajax({
            url: 'https://cdn.jsdelivr.net/gh/KiwiNet-Ltd/JavscriptLibrary@release/talent-form.html',
            xhr: function() {
                var xhr = jQuery.ajaxSettings.xhr();
                var setRequestHeader = xhr.setRequestHeader;
                xhr.setRequestHeader = function(name, value) {
                    return;
                }
                return xhr;
            },
            success: function(data, textStatus, jqXHR) {
                $(container).html($(data));
            }
        });
    };

    /*<script>
    if (typeof KiwiNet != 'undefined') {
        KiwiNet.install_auaha_form(document.getElementById('XX'));
    }
    </script>*/
    methods.install_auaha_form = function(container) {
        jQuery.ajax({
            url: 'https://cdn.jsdelivr.net/gh/KiwiNet-Ltd/JavscriptLibrary@release/site-request.html',
            xhr: function() {
                var xhr = jQuery.ajaxSettings.xhr();
                var setRequestHeader = xhr.setRequestHeader;
                xhr.setRequestHeader = function(name, value) {
                    return;
                }
                return xhr;
            },
            success: function(data, textStatus, jqXHR) {
                $(container).html($(data));
            }
        });
    };


    /*<script>
    if (typeof KiwiNet != 'undefined') {
        KiwiNet.install_auaha_editor(document.getElementById('XX'));
    }
    </script>*/
    methods.install_auaha_editor = function(container) {
        jQuery.ajax({
            url: 'https://cdn.jsdelivr.net/gh/KiwiNet-Ltd/JavscriptLibrary@release/auaha-editor.html',
            xhr: function() {
                var xhr = jQuery.ajaxSettings.xhr();
                var setRequestHeader = xhr.setRequestHeader;
                xhr.setRequestHeader = function(name, value) {
                    return;
                }
                return xhr;
            },
            success: function(data, textStatus, jqXHR) {
                $(container).html($(data));
            }
        });
    };
        
    //Init Fluxx Rich Text Editors
    /*INSTALL CODE
<script>
    if (typeof KiwiNet != 'undefined') {
        KiwiNet.fluxxRichTextEditors("{{ model.id }}");
    }
</script>
    */
    methods.fluxxRichTextEditors = function(modelID) {
        if(modelID != undefined && modelID != null) {
            var db = methods.getUrlParameter('db');
            if (db === undefined) {
                $.ajax({
                  url: "https://cdn.tiny.cloud/1/2r95o2cgzpvzweghblom1djd4aoinula83gidgqlojsvcx45/tinymce/4/tinymce.min.js",
                  dataType: "script",
                  success: function() {

                    var waitForEl = function(callback) {
                    console.log("polling on model - " + modelID);
                      if ($('[data-model-id="'+modelID+'"].detail .redactor-box:visible').length) {
                        callback();
                      } else {
                        setTimeout(function() {
                          waitForEl(callback);
                        }, 100);
                      }
                    };
    
                    waitForEl(function() {
                        $('[data-model-id="'+modelID+'"].detail .redactor-box').each(function() { 
                            var replace = $(this).find('textarea')[0];
                            replace.style.display = 'block';
                            replace.classList.add('richTextEditor');
                            this.replaceWith(replace); 
                        });
                        console.log('actioned');
                        tinymce.EditorManager.editors = []; 
                        tinymce.init({
                            toolbar: [
                                'fontsizeselect | undo redo | styleselect | bold italic underline | link image',
                                'bullist bullist | outdent indent | subscript superscript | alignleft aligncenter alignright | removeformat'
                            ],
                            fontsize_formats: '8pt 9pt 10pt 11pt 12pt 13pt 14pt 16pt 20pt 24pt 36pt 48pt 72pt',
                            selector: '[data-model-id="'+modelID+'"].detail textarea.richTextEditor',
                            setup : function(editor) {
                                editor.on("change keyup", function(e){
                                    editor.save();
                                });
                            },
                            plugins: 'image code autoresize lists',
                            //Updated
                            external_plugins: {
                                'powerpaste': 'https://kiwinetpublic.blob.core.windows.net/fluxx/powerpaste/t151rt65ht-65grh6rt1-65h6t1bt81-1rt814n8rt981rt.min.js'
                            },
                            //Updated
                            images_upload_url: 'https://prod-18.australiasoutheast.logic.azure.com:443/workflows/7a64d78e05b34fa68a1ac77565383b33/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uOO7lqurG_cWCHxNtAn3h4Xva_9TlnPsJD2ZpG8s5Iw',
                            image_title: true,
                            automatic_uploads: true,
                            file_picker_types: 'image',
                            file_picker_callback: function (cb, value, meta) {
                                var input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');
                                input.onchange = function () {
                                    console.log(this);
                                    var file = this.files[0];
                                    var reader = new FileReader();
                                    reader.onload = function () {
                                        var base64 = {
                                            "base64": reader.result
                                        };
                                        //Updated
                                        var response = $.ajax({
                                            type: 'POST',
                                            url: 'https://prod-09.australiasoutheast.logic.azure.com:443/workflows/1eb6b18890d548d58d5c97bff4770c11/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hjCBan2_sicQwi3Au_FmB_wlfwKix4Fcz81r6UcrcRA',
                                            data: JSON.stringify(base64),
                                            dataType: "json",
                                            contentType: "application/json",
                                            async: false
                                        });
                                        cb(response.responseText, { title: file.name });
                                    };
                                    reader.readAsDataURL(file);
                                };
                                input.click();
                            },
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        });
                    });

                }
                });
            }
        }
    }


        //Init Fluxx Regrant Button
    /*INSTALL CODE
<script>
    if (typeof KiwiNet != 'undefined') {
        KiwiNet.fluxxRegrantButton("{{ model.id }}");
    }
</script>
    */
methods.fluxxRegrantButton = function(modelID) {
    if(modelID != undefined && modelID != null) {
        var db = methods.getUrlParameter('db');
        if (db === undefined) {
            var waitForRegrantButton = function(callback) {
                console.log("polling on regrant modal - " + modelID);
                  if ($('[data-model-id="'+modelID+'"].detail .request-regrants-partial a[target=".request-regrants-partial"].to-modal').length) {
                    callback();
                  } else {
                    setTimeout(function() {
                        waitForRegrantButton(callback);
                    }, 100);
                  }
            };

            waitForRegrantButton(function() {
                $('[data-model-id="'+modelID+'"].detail .request-regrants-partial a[target=".request-regrants-partial"].to-modal').each(function() {
                    $(this).removeClass('to-modal');
                    $(this).addClass('new-detail');
                    $(this).attr('data-insert', 'after');
                })
            });
        }
    }
}



    //Init Fluxx rename Save
    /*INSTALL CODE
<script>
    if (typeof KiwiNet != 'undefined') {
        if (typeof KiwiNet.fluxxRenameSave != 'undefined') {
            KiwiNet.fluxxRenameSave("{{ model.id }}");
        }
    }
</script>
    */
methods.fluxxRenameSave = function(modelID) {
    if(modelID != undefined && modelID != null) {
        var db = methods.getUrlParameter('db');
        if (db === undefined) {
            var waitForSaveButton = function(callback) {
                console.log("polling on regrant modal - " + modelID);
                  if ($('[data-model-id="'+modelID+'"].detail footer section.edit a[data-cy="save-button"]').length) {
                    callback();
                  } else {
                    setTimeout(function() {
                        waitForSaveButton(callback);
                    }, 100);
                  }
            };

            waitForSaveButton(function() {
                $('[data-model-id="'+modelID+'"].detail footer section.edit a[data-cy="save-button"]').text('Save Draft');
            });
        }
    }
}


    //Userguiding - Fluxx Container
        /*INSTALL CODE
<script>
    if (typeof KiwiNet != 'undefined') {
        KiwiNet.UserGuidingFluxx("{{ user.user_profile_id }}", "{{ user.last_login_at }}");
    }
</script>
    */
    methods.UserGuidingFluxx = function(userprofileID, lastloggedin = true) {
        if (typeof userGuiding == 'undefined') {
            if (lastloggedin == "") {
                window.UGshowintro = true;
            }
            else {
                window.UGshowintro = false;
            }
            window.granteeType = userprofileID;
            (function(g,u,i,d,e,s){g[e]=g[e]||[];var f=u.getElementsByTagName(i)[0];var k=u.createElement(i);k.async=true;k.src='https://static.userguiding.com/media/user-guiding-'+s+'-embedded.js';f.parentNode.insertBefore(k,f);if(g[d])return;var ug=g[d]={q:[]};ug.c=function(n){return function(){ug.q.push([n,arguments])};};var m=['previewGuide','finishPreview','track','identify','triggerNps','hideChecklist','launchChecklist'];for(var j=0;j<m.length;j+=1){ug[m[j]]=ug.c(m[j]);}})(window,document,'script','userGuiding','userGuidingLayer','881222442ID'); 
        }
    }
    
    return methods;
})();

/*

var link = $('<li class="icon"><a class="link" target="_blank" href="https://kiwinet.powerappsportals.com/reporting/#portfolio" title="Reporting Dashboard"><span class="label">Reporting Dashboard</span></a></li>');
$('ol#iconlist ul#information').append(link);

*/