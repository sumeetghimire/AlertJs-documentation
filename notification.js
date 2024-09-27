(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    } else {
        global.ModalLibrary = factory();
    }
})(typeof window !== "undefined" ? window : this, function() {
    function injectCDNs(callback) {
        function loadScript(src, onload) {
            let script = document.createElement('script');
            script.src = src;
            script.onload = onload;
            document.head.appendChild(script);
        }

        function loadCSS(href) {
            let link = document.createElement('link');
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        }

        if (!window.jQuery) {
            loadScript("https://code.jquery.com/jquery-3.6.0.min.js", function() {
                loadBootstrap();
            });
        } else {
            loadBootstrap();
        }

        function loadBootstrap() {
            if (!document.querySelector('link[href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"]')) {
                loadCSS("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
            }

            if (!window.jQuery.fn.modal) {
                loadScript("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js", function() {
                    if (callback) callback();
                });
            } else {
                if (callback) callback();
            }
        }
    }

   
    function ConfirmationDialog(options) {
        const defaults = {
            title: 'Default Title',
            message: 'Default Message',
            confirmText: 'Ok',
            cancelText: 'Cancel',
            position: 'center',
            backgroundColor: '#ffffff', // Default modal background color
            confirmButtonBackgroundColor: '#007bff', // Default confirm button color (Bootstrap primary)
            confirmButtonTextColor: '#ffffff', // Default confirm button text color (white)
            onConfirm: function() {}
        };
    
        const settings = window.jQuery.extend({}, defaults, options);
    
        const modalHtml = `
            <div class="modal fade" id="customModal" tabindex="-1" role="dialog" style="display: block;">
                <div class="modal-dialog modal-dialog-${settings.position}" role="document">
                    <div class="modal-content" style="background-color: ${settings.backgroundColor};">
                        <div class="modal-header">
                            <h5 class="modal-title">${settings.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">${settings.message}</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">${settings.cancelText}</button>
                            <button type="button" class="btn btn-primary" id="confirmBtn" style="background-color: ${settings.confirmButtonBackgroundColor}; color: ${settings.confirmButtonTextColor};">
                                ${settings.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        window.jQuery('body').append(modalHtml);
        window.jQuery('#customModal').modal('show');
    
        window.jQuery('#confirmBtn').on('click', function() {
            settings.onConfirm();
            window.jQuery('#customModal').modal('hide').on('hidden.bs.modal', function() {
                window.jQuery(this).remove();
            });
        });
    
        window.jQuery('#customModal').on('hidden.bs.modal', function() {
            window.jQuery(this).remove();
        });
    
        positionModal(settings.position);
    }
    

    function AlertModal(options) {
        const defaults = {
            title: 'Alert Title',
            message: 'This is an alert message.',
            confirmText: 'Okay',
            position: 'center', 
            onConfirm: function() {},
            backgroundColor: '#ffc107', // Default background color (yellow)
            buttonBackgroundColor: '#007bff', // Default button background color (Bootstrap primary)
            buttonTextColor: '#ffffff' // Default button text color (white)
        };
    
        const settings = window.jQuery.extend({}, defaults, options);
    
        const modalHtml = `
            <div class="modal fade" id="alertModal" tabindex="-1" role="dialog" style="display: block;">
                <div class="modal-dialog modal-dialog-${settings.position}" role="document">
                    <div class="modal-content" style="background-color: ${settings.backgroundColor};">
                        <div class="modal-header">
                            <h5 class="modal-title">${settings.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>${settings.message}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" id="alertConfirmBtn" 
                                    style="background-color: ${settings.buttonBackgroundColor}; color: ${settings.buttonTextColor};">
                                ${settings.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        window.jQuery('body').append(modalHtml);
        window.jQuery('#alertModal').modal('show');
    
        window.jQuery('#alertConfirmBtn').on('click', function() {
            settings.onConfirm();
            window.jQuery('#alertModal').modal('hide').on('hidden.bs.modal', function() {
                window.jQuery(this).remove();
            });
        });
    
        window.jQuery('#alertModal').on('hidden.bs.modal', function() {
            window.jQuery(this).remove();
        });
    
        positionModal(settings.position);
    }
    
    
    function TripleChoiceModal(options) {
        const defaults = {
            title: 'Choose an Option',
            message: 'Please select one of the following options:',
            yesText: 'Yes',
            noText: 'No',
            cancelText: 'Cancel',
            position: 'center',
            onYes: function() {},
            onNo: function() {},
            onCancel: function() {},
            backgroundColor: '#ffffff', // Default modal background color
            yesButtonBackgroundColor: '#007bff', // Default Yes button background color
            yesButtonTextColor: '#ffffff',       // Default Yes button text color
            noButtonBackgroundColor: '#6c757d',  // Default No button background color
            noButtonTextColor: '#ffffff',        // Default No button text color
            cancelButtonBackgroundColor: '#f8f9fa', // Default Cancel button background color
            cancelButtonTextColor: '#000000'     // Default Cancel button text color
        };
    
        const settings = window.jQuery.extend({}, defaults, options);
    
        const modalHtml = `
            <div class="modal fade" id="tripleChoiceModal" tabindex="-1" role="dialog" style="display: block;">
                <div class="modal-dialog modal-dialog-${settings.position}" role="document">
                    <div class="modal-content" style="background-color: ${settings.backgroundColor};">
                        <div class="modal-header">
                            <h5 class="modal-title">${settings.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>${settings.message}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" id="yesBtn" 
                                style="background-color: ${settings.yesButtonBackgroundColor}; color: ${settings.yesButtonTextColor};">
                                ${settings.yesText}
                            </button>
                            <button type="button" class="btn" id="noBtn" 
                                style="background-color: ${settings.noButtonBackgroundColor}; color: ${settings.noButtonTextColor};">
                                ${settings.noText}
                            </button>
                            <button type="button" class="btn" data-dismiss="modal" 
                                style="background-color: ${settings.cancelButtonBackgroundColor}; color: ${settings.cancelButtonTextColor};">
                                ${settings.cancelText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        window.jQuery('body').append(modalHtml);
        window.jQuery('#tripleChoiceModal').modal('show');
    
        window.jQuery('#yesBtn').on('click', function() {
            settings.onYes();
            window.jQuery('#tripleChoiceModal').modal('hide').on('hidden.bs.modal', function() {
                window.jQuery(this).remove();
            });
        });
    
        window.jQuery('#noBtn').on('click', function() {
            settings.onNo();
            window.jQuery('#tripleChoiceModal').modal('hide').on('hidden.bs.modal', function() {
                window.jQuery(this).remove();
            });
        });
    
        window.jQuery('#tripleChoiceModal').on('hidden.bs.modal', function() {
            settings.onCancel(); // Call onCancel when modal is closed
            window.jQuery(this).remove();
        });
    
        positionModal(settings.position);
    }
    


   

    function SuccessNotificationModal(options) {
        const defaults = {
            title: 'Success!',
            message: 'Your work has been saved.',
            position: 'top-end', // Can be top-left, top-right, bottom-left, bottom-right, center
            duration: 1500, // Duration in milliseconds
            fontSize: '1.5rem', // Default font size
            backgroundColor: '#ffffff', // Default modal background color
            textColor: '#000000', // Default text color
            checkmarkColor: 'green' // Default checkmark color
        };
    
        const settings = window.jQuery.extend({}, defaults, options);
    
        const modalHtml = `
            <div class="modal fade" id="successNotificationModal" tabindex="-1" role="dialog" style="display: block;">
                <div class="modal-dialog modal-dialog-${settings.position}" role="document">
                    <div class="modal-content" style="background-color: ${settings.backgroundColor};">
                        <div class="modal-header">
                            <h5 class="modal-title" style="color: ${settings.textColor};">${settings.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body text-center">
                            <div class="alert alert-success d-flex align-items-center justify-content-center">
                                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle class="checkmark__circle" cx="26" cy="26" r="25" />
                                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                </svg>
                                <span class="ml-2 message-text" style="font-size: ${settings.fontSize}; color: ${settings.textColor};">${settings.message}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .checkmark__circle {
                    stroke-dasharray: 166;
                    stroke-dashoffset: 166;
                    stroke-width: 2;
                    stroke-miterlimit: 10;
                    stroke: ${settings.checkmarkColor}; /* Dynamic checkmark color */
                    fill: none;
                    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                }
    
                .checkmark {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    display: block;
                    stroke-width: 2;
                    stroke: ${settings.checkmarkColor}; /* Dynamic checkmark color */
                    stroke-miterlimit: 10;
                    margin: 10% auto;
                    box-shadow: inset 0px 0px 0px #7ac142;
                    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
                }
    
                .checkmark__check {
                    transform-origin: 50% 50%;
                    stroke-dasharray: 48;
                    stroke-dashoffset: 48;
                    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
                }
    
                @keyframes stroke {
                    100% {
                        stroke-dashoffset: 0;
                    }
                }
    
                @keyframes scale {
                    0%, 100% {
                        transform: none;
                    }
                    50% {
                        transform: scale3d(1.1, 1.1, 1);
                    }
                }
    
                @keyframes fill {
                    100% {
                        box-shadow: inset 0px 0px 0px 30px #fff;
                    }
                }
            </style>
        `;
    
        window.jQuery('body').append(modalHtml);
        window.jQuery('#successNotificationModal').modal('show');
    
        setTimeout(function() {
            window.jQuery('#successNotificationModal').modal('hide').on('hidden.bs.modal', function() {
                window.jQuery(this).remove();
            });
        }, settings.duration);
    }
    

    function DynamicFormModal(options) {
        const defaults = {
            title: 'Dynamic Form',
            inputs: [], // Array of input configurations
            onSubmit: function(data) {}, // Function to call on form submission
            onCancel: function() {}, // Function to call on cancel
            submitText: 'Submit',
            cancelText: 'Cancel',
            backgroundColor: '#ffffff', // Default background color
            buttonColor: '#007bff', // Default button color
            cancelButtonColor: '#6c757d', // Default cancel button color
            position: 'center' // Default position
        };
    
        const settings = window.jQuery.extend({}, defaults, options);
    
        const generateInputHtml = (input) => {
            const { type, label, placeholder, id, name, class: className, options } = input;
            switch (type) {
                case 'text':
                    return `<div class="form-group">
                                <label for="${id}">${label}</label>
                                <input type="text" class="form-control ${className || ''}" id="${id}" name="${name}" placeholder="${placeholder}" required>
                            </div>`;
                case 'select':
                    return `<div class="form-group">
                                <label for="${id}">${label}</label>
                                <select class="form-control ${className || ''}" id="${id}" name="${name}" required>
                                    ${options.map(option => `<option value="${option.value}">${option.text}</option>`).join('')}
                                </select>
                            </div>`;
                case 'checkbox':
                    return `<div class="form-group form-check">
                                <input type="checkbox" class="form-check-input ${className || ''}" id="${id}" name="${name}">
                                <label class="form-check-label" for="${id}">${label}</label>
                            </div>`;
                case 'radio':
                    return `<div class="form-group">
                                <label>${label}</label>
                                ${options.map(option => `
                                    <div class="form-check">
                                        <input class="form-check-input ${className || ''}" type="radio" name="${name}" value="${option.value}" id="${option.id}">
                                        <label class="form-check-label" for="${option.id}">${option.text}</label>
                                    </div>`).join('')}
                            </div>`;
                // Add more input types as needed
                default:
                    return '';
            }
        };
    
        const modalHtml = `
            <div class="modal fade" id="dynamicFormModal" tabindex="-1" role="dialog" style="display: block;">
                <div class="modal-dialog modal-dialog-${settings.position}" role="document">
                    <div class="modal-content" style="background-color: ${settings.backgroundColor};">
                        <div class="modal-header">
                            <h5 class="modal-title">${settings.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="dynamicForm">
                                ${settings.inputs.map(generateInputHtml).join('')}
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" style="background-color: ${settings.buttonColor}; color: white;" id="submitBtn">${settings.submitText}</button>
                            <button type="button" class="btn" style="background-color: ${settings.cancelButtonColor}; color: white;" id="cancelBtn">${settings.cancelText}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        // Append modal HTML to body
        window.jQuery('body').append(modalHtml);
        window.jQuery('#dynamicFormModal').modal('show');
    
        // Bind click events for submit and cancel buttons
        const bindEvents = () => {
            window.jQuery('#submitBtn').off('click').on('click', function() {
                const formData = {};
                window.jQuery('#dynamicForm').find('input, select').each(function() {
                    if (this.type === 'checkbox') {
                        formData[this.id] = this.checked;
                    } else {
                        formData[this.name || this.id] = this.value;
                    }
                });
                settings.onSubmit(formData);
                closeModal();
            });
    
            window.jQuery('#cancelBtn').off('click').on('click', function() {
                settings.onCancel();
                closeModal();
            });
        };
    
        const closeModal = () => {
            window.jQuery('#dynamicFormModal').modal('hide').on('hidden.bs.modal', function() {
                window.jQuery(this).remove();
            });
        };
    
        // Bind events
        bindEvents();
    }
    


    function CustomImageModal(options) {
        const defaults = {
            title: 'Notification',
            message: 'This is a custom message.',
            imageSrc: '', // URL of the custom image
            backgroundColor: '#ffffff', // Default background color
            buttonColor: '#007bff', // Default button color
            position: 'center' // Default position
        };
    
        const settings = window.jQuery.extend({}, defaults, options);
    
        const modalHtml = `
            <div class="modal fade" id="customImageModal" tabindex="-1" role="dialog" style="display: block;">
                <div class="modal-dialog modal-dialog-${settings.position}" role="document">
                    <div class="modal-content" style="background-color: ${settings.backgroundColor};">
                        <div class="modal-header">
                            <h5 class="modal-title">${settings.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body text-center">
                            ${settings.imageSrc ? `<img src="${settings.imageSrc}" alt="Custom Image" class="img-fluid" />` : ''}
                            <p>${settings.message}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" style="background-color: ${settings.buttonColor}; color: white;" id="okBtn">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        // Append modal HTML to body
        window.jQuery('body').append(modalHtml);
        window.jQuery('#customImageModal').modal('show');
    
        // Bind click event for OK button
        window.jQuery('#okBtn').on('click', function() {
            closeModal();
        });
    
        const closeModal = () => {
            window.jQuery('#customImageModal').modal('hide').on('hidden.bs.modal', function() {
                window.jQuery(this).remove();
            });
        };
    }
    


    function positionModal(position) {
        const modalDialog = window.jQuery('.modal-dialog');

        modalDialog.removeClass('modal-dialog-centered modal-dialog-top modal-dialog-bottom modal-dialog-left modal-dialog-right');

        switch (position) {
            case 'top':
                modalDialog.addClass('modal-dialog-top');
                break;
            case 'bottom':
                modalDialog.addClass('modal-dialog-bottom');
                break;
            case 'left':
                modalDialog.addClass('modal-dialog-left');
                break;
            case 'right':
                modalDialog.addClass('modal-dialog-right');
                break;
            case 'center':
            default:
                modalDialog.addClass('modal-dialog-centered');
                break;
        }
    }

    injectCDNs(function() {
        window.ConfirmationDialog = ConfirmationDialog; 
        window.AlertModal = AlertModal; 
        window.TripleChoiceModal = TripleChoiceModal;
        window.SuccessNotificationModal = SuccessNotificationModal;
        window.DynamicFormModal = DynamicFormModal;
        window.CustomImageModal = CustomImageModal;
    });

    return { ConfirmationDialog, AlertModal, TripleChoiceModal,SuccessNotificationModal,DynamicFormModal,CustomImageModal }; 
});
