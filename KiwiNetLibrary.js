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

/*INSTALL CODE
<script>
    if (typeof KiwiNet != 'undefined') {
        KiwiNet.install_talent_form(document.getElementById('XX'));
    }
</script>
*/
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

/*INSTALL CODE
<script>
    if (typeof KiwiNet != 'undefined') {
        KiwiNet.install_auaha_form(document.getElementById('XX'));
    }
</script>
*/
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

/*INSTALL CODE
<script>
    if (typeof KiwiNet != 'undefined') {
        KiwiNet.install_auaha_editor(document.getElementById('XX'));
    }
</script>
*/
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
                            images_upload_url: 'https://92624a785f19e967a636e7127e9c98.ca.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/7a64d78e05b34fa68a1ac77565383b33/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=B-1uQimTJFvUDKHM4o67vXMSrMKRWt--NCYAhokCAq0',
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
                                            url: 'https://92624a785f19e967a636e7127e9c98.ca.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/1eb6b18890d548d58d5c97bff4770c11/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=c_1FHOQ2Ccx49h1zuo0BJmkn10G6GCDlEe4VvxC_rzU',
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
    

/*
    ------------------
    Fluxx V2 Functions
    ------------------
*/

//V2 Installation
/* =====================================================================
   KIWINET FLUXX UI - INSTALLATION TEMPLATE
   Paste this snippet into the Fluxx form's liquid HTML.
   Uncomment the specific V2 UI components required for the form.
   =====================================================================

<script>
    (async function() {
        // 1. Core Configuration
        window.kn_automatekey = "[replace with key from password manager]";
        const currentModelID = "{{ model.id }}";

        // 2. Safely Load the KiwiNet Library
        const loadKiwiNet = () => new Promise((resolve) => {
            if (typeof KiwiNet !== 'undefined') return resolve();
            var script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/gh/KiwiNet-Ltd/JavscriptLibrary@release/KiwiNetLibrary.js?v=0";
            script.onload = resolve; // Wait for the download to finish
            document.head.appendChild(script);
        });

        await loadKiwiNet();

        // 3. V2 UI Orchestrator
        try {
            // Await the master dialog context first
            const $dialog = await KiwiNet.awaitFluxxEditDialog(currentModelID);
            
            // Clean exit if conditions (like 'db' url param) dictate skipping
            if (!$dialog) return; 

            // ---------------------------------------------------------
            // 4. COMPONENT TOGGLES: Comment / Uncomment as needed
            // ---------------------------------------------------------
            
            // Rich Text Editors
            //KiwiNet.fluxxRichTextEditorsV2(currentModelID, $dialog).catch(err => console.warn(err));
            
            // Rename Save Button
            //KiwiNet.fluxxRenameSaveV2(currentModelID, $dialog).catch(err => console.warn(err));
            
            // Regrant Button
            // KiwiNet.fluxxRegrantButtonV2(currentModelID, $dialog).catch(err => console.warn(err));
            
            // Replace Grantee Fields
            // KiwiNet.fluxxReplaceGranteeFields(currentModelID, $dialog).catch(err => console.warn(err));

        } catch (error) {
            // Catches missing IDs or master dialog polling timeouts
            console.warn("KiwiNet Fluxx UI Workflow Aborted:", error);
        }
    })();
</script>

   ===================================================================== */

    methods.awaitFluxxEditDialog = async (modelID) => {
        return new Promise((resolve, reject) => {
            if (modelID == undefined || modelID == null) {
                return reject("Execution aborted: modelID is missing.");
            }

            var db = methods.getUrlParameter('db');
            if (db !== undefined) {
                console.debug("db parameter present. Skipping dialog initialization.");
                return resolve(null); 
            }

            let attempts = 0;
            const maxAttempts = 100;

            var waitForEl = () => {
                attempts++;
                console.debug(`Polling on model ${modelID} - Attempt ${attempts}`);
                var $dialogContext = $(`[data-model-id="${modelID}"].detail`);
                if ($dialogContext.length > 0) {
                    resolve($dialogContext); 
                } 
                else if (attempts >= maxAttempts) {
                    reject(`Timeout: Dialog for model ${modelID} never appeared.`);
                }
                else {
                    setTimeout(waitForEl, 100);
                }
            };

            waitForEl(); 
        });
    };

    methods.fluxxRichTextEditorsV2 = async (modelID, $dialogContext) => {
        if (!$dialogContext || $dialogContext.length === 0) {
            console.warn(`fluxxRichTextEditorsV2 aborted: No dialog context provided for model ${modelID}.`);
            return;
        }

        const initializeEditors = () => {
            // 1. Add reject to the Promise parameters
            return new Promise((resolve, reject) => {
                let attempts = 0;
                const maxAttempts = 100;

                const waitForRedactor = () => {
                    attempts++;
                    console.debug(`Polling for redactor boxes on model ${modelID} - Attempt ${attempts}`);
                    
                    const $redactorBoxes = $dialogContext.find('.redactor-box:visible');

                    if ($redactorBoxes.length > 0) {
                        $redactorBoxes.each(function() { 
                            var replace = $(this).find('textarea')[0];
                            if (replace) {
                                replace.style.display = 'block';
                                replace.classList.add('richTextEditor');
                                this.replaceWith(replace); 
                            }
                        });
                        console.log(`Rich text elements swapped for model ${modelID}`);

                        tinymce.EditorManager.editors = []; 
                        tinymce.init({
                            toolbar: [
                                'fontsizeselect | undo redo | styleselect | bold italic underline | link image',
                                'bullist bullist | outdent indent | subscript superscript | alignleft aligncenter alignright | removeformat'
                            ],
                            fontsize_formats: '8pt 9pt 10pt 11pt 12pt 13pt 14pt 16pt 20pt 24pt 36pt 48pt 72pt',
                            selector: `[data-model-id="${modelID}"].detail textarea.richTextEditor`,
                            setup: function(editor) {
                                editor.on("change keyup", function(e){
                                    editor.save();
                                });
                            },
                            plugins: 'image code autoresize lists',
                            external_plugins: {
                                'powerpaste': 'https://kiwinetpublic.blob.core.windows.net/fluxx/powerpaste/t151rt65ht-65grh6rt1-65h6t1bt81-1rt814n8rt981rt.min.js'
                            },
                            images_upload_url: 'https://92624a785f19e967a636e7127e9c98.ca.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/7a64d78e05b34fa68a1ac77565383b33/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=B-1uQimTJFvUDKHM4o67vXMSrMKRWt--NCYAhokCAq0',
                            image_title: true,
                            automatic_uploads: true,
                            file_picker_types: 'image',
                            file_picker_callback: function (cb, value, meta) {
                                var input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');
                                input.onchange = function () {
                                    var file = this.files[0];
                                    var reader = new FileReader();
                                    reader.onload = function () {
                                        var base64 = {
                                            "base64": reader.result
                                        };
                                        var response = $.ajax({
                                            type: 'POST',
                                            url: 'https://92624a785f19e967a636e7127e9c98.ca.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/1eb6b18890d548d58d5c97bff4770c11/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=c_1FHOQ2Ccx49h1zuo0BJmkn10G6GCDlEe4VvxC_rzU',
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
                        resolve();
                    }
                    else if (attempts >= maxAttempts) {
                        reject(`Timeout: Redactor boxes never appeared for model ${modelID}.`);
                    }
                    else {
                        setTimeout(waitForRedactor, 100);
                    }
                };

                waitForRedactor();
            });
        };

        if (typeof tinymce === 'undefined') {
            console.debug("Loading TinyMCE script...");
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "https://cdn.tiny.cloud/1/2r95o2cgzpvzweghblom1djd4aoinula83gidgqlojsvcx45/tinymce/4/tinymce.min.js",
                    dataType: "script",
                    success: async function() {
                        await initializeEditors();
                        resolve();
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error("Failed to load TinyMCE script:", textStatus, errorThrown);
                        reject(`TinyMCE failed to load for model ${modelID}. Rich text initialization aborted.`);
                    }
                });
            });
        }
        else {
            return initializeEditors();
        }
    };

    methods.fluxxRegrantButtonV2 = async (modelID, $dialogContext) => {
        if (!$dialogContext || $dialogContext.length === 0) {
            return Promise.reject(`fluxxRegrantButtonV2 aborted: No dialog context provided for model ${modelID}.`);
        }

        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 100;

            const waitForRegrantButton = () => {
                attempts++;
                console.debug(`Polling for regrant button on model ${modelID} - Attempt ${attempts}`);
                
                const $targetButtons = $dialogContext.find('.request-regrants-partial a[target=".request-regrants-partial"].to-modal');

                if ($targetButtons.length > 0) {
                    $targetButtons.each(function() {
                        $(this).removeClass('to-modal');
                        $(this).addClass('new-detail');
                        $(this).attr('data-insert', 'after');
                    });
                    
                    console.log(`Regrant button actioned for model ${modelID}`);
                    resolve(); 
                }
                else if (attempts >= maxAttempts) {
                    reject(`Timeout: Regrant button never appeared for model ${modelID}.`);
                }
                else {
                    setTimeout(waitForRegrantButton, 100);
                }
            };

            waitForRegrantButton();
        });
    };

    methods.fluxxRenameSaveV2 = async (modelID, $dialogContext) => {
        if (!$dialogContext || $dialogContext.length === 0) {
            return Promise.reject(`fluxxRenameSaveV2 aborted: No dialog context provided for model ${modelID}.`);
        }

        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 100;

            const waitForSaveButton = () => {
                attempts++;
                console.debug(`Polling for save button on model ${modelID} - Attempt ${attempts}`);
                
                const $saveButton = $dialogContext.find('footer section.edit a[data-cy="save-button"]');

                if ($saveButton.length > 0) {
                    $saveButton.text('Save Draft');
                    
                    console.log(`Save button renamed to 'Save Draft' for model ${modelID}`);
                    resolve(); 
                }
                else if (attempts >= maxAttempts) {
                    reject(`Timeout: Save button never appeared for model ${modelID}.`);
                    
                }
                else {
                    setTimeout(waitForSaveButton, 100);
                }
            };

            waitForSaveButton();
        });
    };

    methods.fluxxReplaceGranteeFields = async (modelID, $dialogContext) => {
        if (!$dialogContext || $dialogContext.length === 0) {
            return Promise.reject(`fluxxReplaceGranteeFieldsV2 aborted: No dialog context provided for model ${modelID}.`);
        }

        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 100;

            const waitForElements = () => {
                attempts++;
                console.debug(`Polling for Grantee fields on model ${modelID} - Attempt ${attempts}`);
                const $orgSelect = $dialogContext.find('select[data-original-id="grant_request_program_organization_id"]');
                const $primaryContactLi = $dialogContext.find('li[data-original-id="grant_request_grantee_org_owner_id_input"]');
                const $signatoryLi = $dialogContext.find('li[data-original-id="grant_request_grantee_signatory_id_input"]');

                if ($orgSelect.length > 0 && $primaryContactLi.length > 0 && $signatoryLi.length > 0) {
                    console.log(`Grantee fields found for model ${modelID}. Initializing overrides.`);

                    const replaceFieldWithSelect = ($wrapperLi, usersData, originalId) => {
                        const $textInput = $wrapperLi.find(`input[type="text"][data-original-id="${originalId}"]`);
                        const $hiddenInput = $wrapperLi.find(`input[type="hidden"][data-original-id="${originalId}"]`);
                        const currentValue = $hiddenInput.val();

                        let $customSelect = $wrapperLi.find('.kiwinet-user-dropdown');
                        if ($customSelect.length === 0) {
                            $customSelect = $('<select class="kiwinet-user-dropdown"></select>');
                            $textInput.hide();
                            $customSelect.insertAfter($textInput);
                            $customSelect.on('change', function() {
                                $hiddenInput.val($(this).val());
                                $textInput.val($(this).find("option:selected").text());
                            });
                        }

                        $customSelect.empty();
                        $customSelect.append('<option value="">-- Select a User --</option>');
                        
                        usersData.forEach(user => {
                            const isSelected = (user.value.toString() === currentValue.toString()) ? 'selected' : '';
                            $customSelect.append(`<option value="${user.value}" ${isSelected}>${user.label}</option>`);
                        });
                    };

                    const fetchUsersAndPopulate = async (orgId) => {
                        if (!orgId) return;
                        try {
                            const data = await $.ajax({
                                url: 'https://92624a785f19e967a636e7127e9c98.ca.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/6f64318e0cd94627963d9fd00029af2b/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2nY_6RrAF-HRI7KD80BIQvOSchvwyVJjjpCNC-20sa4',
                                headers: { "kn_automatekey": window.kn_automatekey },
                                type: 'POST',
                                dataType: 'json',
                                contentType: 'application/json',
                                data: JSON.stringify({ "organisation_id": orgId })
                            });
                            data.sort((a, b) => a.label.localeCompare(b.label));

                            replaceFieldWithSelect($primaryContactLi, data, 'grant_request_grantee_org_owner_id');
                            replaceFieldWithSelect($signatoryLi, data, 'grant_request_grantee_signatory_id');
                        }
                        catch (err) {
                            console.error(`Failed to fetch users for Org ${orgId}:`, err);
                        }
                    };

                    $orgSelect.on('change', function() {
                        fetchUsersAndPopulate($(this).val());
                    });

                    const initialOrgId = $orgSelect.val();
                    if (initialOrgId) {
                        fetchUsersAndPopulate(initialOrgId);
                    }
                    resolve();

                }
                else if (attempts >= maxAttempts) {
                    reject(`Timeout: Organisation and Grantee fields never appeared for model ${modelID}.`);
                }
                else {
                    setTimeout(waitForElements, 100);
                }
            };

            waitForElements();
        });
    };

//V2 Debugging
/*
// 2. PASTE THE CONTENTS OF YOUR V2 FUNCTION HERE
const testFunction = async (modelID, $dialogContext) => {

};

// 3. THE DEBUGGER EXECUTION
(async function runManualTest() {
    console.log("🚀 Starting V2 Function Debugger...");

    // Auto-detect the currently open dialog in the DOM
    const $dialogContext = $('.detail:visible').first();
    
    if ($dialogContext.length === 0) {
        console.error("❌ No visible Fluxx edit dialog found. Please open a record first.");
        return;
    }

    // Extract the exact model ID from the visible dialog
    const modelID = $dialogContext.data('model-id');
    console.log(`✅ Target acquired. Active Model ID: ${modelID}`);

    try {
        console.log("⏳ Executing test function...");
        
        // Fire the function with our manually grabbed variables
        await testFunction(modelID, $dialogContext);
        
        console.log("🎉 Test completed successfully. Check the UI for expected changes.");
    } catch (error) {
        // This will catch any explicit reject() calls from your timeouts or AJAX fails
        console.error("💥 Function rejected or threw an error:", error);
    }
})();
*/


    return methods;
})();

/*
var link = $('<li class="icon"><a class="link" target="_blank" href="https://kiwinet.powerappsportals.com/reporting/#portfolio" title="Reporting Dashboard"><span class="label">Reporting Dashboard</span></a></li>');
$('ol#iconlist ul#information').append(link);
*/