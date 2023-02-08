import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React from 'react';
import TextAreaAutosize from 'react-textarea-autosize';
import { ContentState, EditorState, convertFromHTML, convertToRaw, } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import DynamicOptionList from './dynamic-option-list';
import { get } from './stores/requests';
import ID from './UUID';
import IntlMessages from './language-provider/IntlMessages';
const toolbar = {
    options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
    inline: {
        inDropdown: false,
        className: undefined,
        options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
    },
};
export default class FormElementsEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: this.props.element,
            data: this.props.data,
            dirty: false,
        };
    }
    toggleRequired() {
        // const this_element = this.state.element;
    }
    editElementProp(elemProperty, targProperty, e) {
        // elemProperty could be content or label
        // targProperty could be value or checked
        const this_element = this.state.element;
        this_element[elemProperty] = e.target[targProperty];
        this.setState({
            element: this_element,
            dirty: true,
        }, () => {
            if (targProperty === 'checked') {
                this.updateElement();
            }
        });
    }
    onEditorStateChange(index, property, editorContent) {
        // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
        const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ')
            .replace(/(?:\r\n|\r|\n)/g, ' ');
        const this_element = this.state.element;
        this_element[property] = html;
        this.setState({
            element: this_element,
            dirty: true,
        });
    }
    updateElement() {
        const this_element = this.state.element;
        // to prevent ajax calls with no change
        if (this.state.dirty) {
            this.props.updateElement.call(this.props.preview, this_element);
            this.setState({ dirty: false });
        }
    }
    convertFromHTML(content) {
        const newContent = convertFromHTML(content);
        if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
            // to prevent crash when no contents in editor
            return EditorState.createEmpty();
        }
        const contentState = ContentState.createFromBlockArray(newContent);
        return EditorState.createWithContent(contentState);
    }
    addOptions() {
        const optionsApiUrl = document.getElementById('optionsApiUrl').value;
        if (optionsApiUrl) {
            get(optionsApiUrl).then(data => {
                this.props.element.options = [];
                const { options } = this.props.element;
                data.forEach(x => {
                    // eslint-disable-next-line no-param-reassign
                    x.key = ID.uuid();
                    options.push(x);
                });
                const this_element = this.state.element;
                this.setState({
                    element: this_element,
                    dirty: true,
                });
            });
        }
    }
    render() {
        if (this.state.dirty) {
            this.props.element.dirty = true;
        }
        const this_checked = this.props.element.hasOwnProperty('required') ? this.props.element.required : false;
        const this_read_only = this.props.element.hasOwnProperty('readOnly') ? this.props.element.readOnly : false;
        const this_default_today = this.props.element.hasOwnProperty('defaultToday') ? this.props.element.defaultToday : false;
        const this_show_time_select = this.props.element.hasOwnProperty('showTimeSelect') ? this.props.element.showTimeSelect : false;
        const this_show_time_select_only = this.props.element.hasOwnProperty('showTimeSelectOnly') ? this.props.element.showTimeSelectOnly : false;
        const this_show_time_input = this.props.element.hasOwnProperty('showTimeInput') ? this.props.element.showTimeInput : false;
        const this_checked_inline = this.props.element.hasOwnProperty('inline') ? this.props.element.inline : false;
        const this_checked_bold = this.props.element.hasOwnProperty('bold') ? this.props.element.bold : false;
        const this_checked_italic = this.props.element.hasOwnProperty('italic') ? this.props.element.italic : false;
        const this_checked_center = this.props.element.hasOwnProperty('center') ? this.props.element.center : false;
        const this_checked_page_break = this.props.element.hasOwnProperty('pageBreakBefore') ? this.props.element.pageBreakBefore : false;
        const this_checked_alternate_form = this.props.element.hasOwnProperty('alternateForm') ? this.props.element.alternateForm : false;
        const { canHavePageBreakBefore, canHaveAlternateForm, canHaveDisplayHorizontal, canHaveOptionCorrect, canHaveOptionValue, } = this.props.element;
        const canHaveImageSize = (this.state.element.element === 'Image' || this.state.element.element === 'Camera');
        const this_files = this.props.files.length ? this.props.files : [];
        if (this_files.length < 1 || (this_files.length > 0 && this_files[0].id !== '')) {
            this_files.unshift({ id: '', file_name: '' });
        }
        let editorState;
        if (this.props.element.hasOwnProperty('content')) {
            editorState = this.convertFromHTML(this.props.element.content);
        }
        if (this.props.element.hasOwnProperty('label')) {
            editorState = this.convertFromHTML(this.props.element.label);
        }
        return (_jsxs("div", { children: [_jsxs("div", { className: "clearfix", children: [_jsx("h4", { className: "float-left", children: this.props.element.text }), _jsx("i", { className: "float-right fas fa-times dismiss-edit", onClick: this.props.manualEditModeOff })] }), this.props.element.hasOwnProperty('content') &&
                    _jsxs("div", { className: "form-group", children: [_jsxs("label", { className: "control-label", children: [_jsx(IntlMessages, { id: "text-to-display" }), ":"] }), _jsx(Editor, { toolbar: toolbar, defaultEditorState: editorState, onBlur: this.updateElement.bind(this), onEditorStateChange: this.onEditorStateChange.bind(this, 0, 'content'), stripPastedStyles: true })] }), this.props.element.hasOwnProperty('file_path') &&
                    _jsxs("div", { className: "form-group", children: [_jsxs("label", { className: "control-label", htmlFor: "fileSelect", children: [_jsx(IntlMessages, { id: "choose-file" }), ":"] }), _jsx("select", { id: "fileSelect", className: "form-control", defaultValue: this.props.element.file_path, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'file_path', 'value'), children: this_files.map((file) => {
                                    const this_key = `file_${file.id}`;
                                    return _jsx("option", { value: file.id, children: file.file_name }, this_key);
                                }) })] }), this.props.element.hasOwnProperty('href') &&
                    _jsx("div", { className: "form-group", children: _jsx(TextAreaAutosize, { type: "text", className: "form-control", defaultValue: this.props.element.href, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'href', 'value') }) }), this.props.element.hasOwnProperty('label') &&
                    _jsxs("div", { className: "form-group", children: [_jsx("label", { children: _jsx(IntlMessages, { id: "display-label" }) }), _jsx(Editor, { toolbar: toolbar, defaultEditorState: editorState, onBlur: this.updateElement.bind(this), onEditorStateChange: this.onEditorStateChange.bind(this, 0, 'label'), stripPastedStyles: true }), _jsx("br", {}), _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "is-required", className: "custom-control-input", type: "checkbox", checked: this_checked, value: true, onChange: this.editElementProp.bind(this, 'required', 'checked') }), _jsx("label", { className: "custom-control-label", htmlFor: "is-required", children: _jsx(IntlMessages, { id: "required" }) })] }), this.props.element.hasOwnProperty('readOnly') &&
                                _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "is-read-only", className: "custom-control-input", type: "checkbox", checked: this_read_only, value: true, onChange: this.editElementProp.bind(this, 'readOnly', 'checked') }), _jsx("label", { className: "custom-control-label", htmlFor: "is-read-only", children: _jsx(IntlMessages, { id: "read-only" }) })] }), this.props.element.hasOwnProperty('defaultToday') &&
                                _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "is-default-to-today", className: "custom-control-input", type: "checkbox", checked: this_default_today, value: true, onChange: this.editElementProp.bind(this, 'defaultToday', 'checked') }), _jsxs("label", { className: "custom-control-label", htmlFor: "is-default-to-today", children: [_jsx(IntlMessages, { id: "default-to-today" }), "?"] })] }), this.props.element.hasOwnProperty('showTimeSelect') &&
                                _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "show-time-select", className: "custom-control-input", type: "checkbox", checked: this_show_time_select, value: true, onChange: this.editElementProp.bind(this, 'showTimeSelect', 'checked') }), _jsxs("label", { className: "custom-control-label", htmlFor: "show-time-select", children: [_jsx(IntlMessages, { id: "show-time-select" }), "?"] })] }), this_show_time_select && this.props.element.hasOwnProperty('showTimeSelectOnly') &&
                                _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "show-time-select-only", className: "custom-control-input", type: "checkbox", checked: this_show_time_select_only, value: true, onChange: this.editElementProp.bind(this, 'showTimeSelectOnly', 'checked') }), _jsxs("label", { className: "custom-control-label", htmlFor: "show-time-select-only", children: [_jsx(IntlMessages, { id: "show-time-select-only" }), "?"] })] }), this.props.element.hasOwnProperty('showTimeInput') &&
                                _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "show-time-input", className: "custom-control-input", type: "checkbox", checked: this_show_time_input, value: true, onChange: this.editElementProp.bind(this, 'showTimeInput', 'checked') }), _jsxs("label", { className: "custom-control-label", htmlFor: "show-time-input", children: [_jsx(IntlMessages, { id: "show-time-input" }), "?"] })] }), (this.state.element.element === 'RadioButtons' || this.state.element.element === 'Checkboxes') && canHaveDisplayHorizontal &&
                                _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "display-horizontal", className: "custom-control-input", type: "checkbox", checked: this_checked_inline, value: true, onChange: this.editElementProp.bind(this, 'inline', 'checked') }), _jsx("label", { className: "custom-control-label", htmlFor: "display-horizontal", children: _jsx(IntlMessages, { id: "display-horizontal" }) })] })] }), this.props.element.hasOwnProperty('src') &&
                    _jsx("div", { children: _jsxs("div", { className: "form-group", children: [_jsxs("label", { className: "control-label", htmlFor: "srcInput", children: [_jsx(IntlMessages, { id: "link-to" }), ":"] }), _jsx("input", { id: "srcInput", type: "text", className: "form-control", defaultValue: this.props.element.src, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'src', 'value') })] }) }), canHaveImageSize &&
                    _jsxs("div", { children: [_jsx("div", { className: "form-group", children: _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "do-center", className: "custom-control-input", type: "checkbox", checked: this_checked_center, value: true, onChange: this.editElementProp.bind(this, 'center', 'checked') }), _jsxs("label", { className: "custom-control-label", htmlFor: "do-center", children: [_jsx(IntlMessages, { id: "center" }), "?"] })] }) }), _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-sm-3", children: [_jsxs("label", { className: "control-label", htmlFor: "elementWidth", children: [_jsx(IntlMessages, { id: "width" }), ":"] }), _jsx("input", { id: "elementWidth", type: "text", className: "form-control", defaultValue: this.props.element.width, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'width', 'value') })] }), _jsxs("div", { className: "col-sm-3", children: [_jsxs("label", { className: "control-label", htmlFor: "elementHeight", children: [_jsx(IntlMessages, { id: "height" }), ":"] }), _jsx("input", { id: "elementHeight", type: "text", className: "form-control", defaultValue: this.props.element.height, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'height', 'value') })] })] })] }), this.state.element.element === 'FileUpload' && (_jsx("div", { children: _jsxs("div", { className: 'form-group', children: [_jsxs("label", { className: 'control-label', htmlFor: 'fileType', children: [_jsx(IntlMessages, { id: 'choose-file-type' }), ":"] }), _jsx("select", { id: 'fileType', className: "form-control", onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'fileType', 'value'), children: [
                                    {
                                        type: 'image, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, video/mp4,video/x-m4v,video/*',
                                        typeName: 'All File Type',
                                    },
                                    { type: 'image', typeName: 'Image' },
                                    { type: 'application/pdf', typeName: 'PDF' },
                                    {
                                        type: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                        typeName: 'Word',
                                    },
                                    {
                                        type: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                        typeName: 'Excel',
                                    },
                                    {
                                        type: 'application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                        typeName: 'Powerpoint',
                                    },
                                    {
                                        type: 'video/mp4,video/x-m4v,video/*',
                                        typeName: 'Videos',
                                    },
                                ].map((file, index) => (_jsx("option", { value: file.type, children: file.typeName }, index))) })] }) })), this.state.element.element === 'Signature' && this.props.element.readOnly
                    ? (_jsxs("div", { className: "form-group", children: [_jsxs("label", { className: "control-label", htmlFor: "variableKey", children: [_jsx(IntlMessages, { id: "variable-key" }), ":"] }), _jsx("input", { id: "variableKey", type: "text", className: "form-control", defaultValue: this.props.element.variableKey, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'variableKey', 'value') }), _jsxs("p", { className: "help-block", children: [_jsx(IntlMessages, { id: "variable-key-desc" }), "."] })] }))
                    : (_jsx("div", {})), canHavePageBreakBefore &&
                    _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "control-label", children: _jsx(IntlMessages, { id: "print-options" }) }), _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "page-break-before-element", className: "custom-control-input", type: "checkbox", checked: this_checked_page_break, value: true, onChange: this.editElementProp.bind(this, 'pageBreakBefore', 'checked') }), _jsxs("label", { className: "custom-control-label", htmlFor: "page-break-before-element", children: [_jsx(IntlMessages, { id: "page-break-before-elements" }), "?"] })] })] }), canHaveAlternateForm &&
                    _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "control-label", children: _jsx(IntlMessages, { id: "alternate-signature-page" }) }), _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "display-on-alternate", className: "custom-control-input", type: "checkbox", checked: this_checked_alternate_form, value: true, onChange: this.editElementProp.bind(this, 'alternateForm', 'checked') }), _jsxs("label", { className: "custom-control-label", htmlFor: "display-on-alternate", children: [_jsx(IntlMessages, { id: "display-on-alternate-signature-page" }), "?"] })] })] }), this.props.element.hasOwnProperty('step') &&
                    _jsx("div", { className: "form-group", children: _jsxs("div", { className: "form-group-range", children: [_jsx("label", { className: "control-label", htmlFor: "rangeStep", children: _jsx(IntlMessages, { id: "step" }) }), _jsx("input", { id: "rangeStep", type: "number", className: "form-control", defaultValue: this.props.element.step, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'step', 'value') })] }) }), this.props.element.hasOwnProperty('min_value') &&
                    _jsx("div", { className: "form-group", children: _jsxs("div", { className: "form-group-range", children: [_jsx("label", { className: "control-label", htmlFor: "rangeMin", children: _jsx(IntlMessages, { id: "min" }) }), _jsx("input", { id: "rangeMin", type: "number", className: "form-control", defaultValue: this.props.element.min_value, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'min_value', 'value') }), _jsx("input", { type: "text", className: "form-control", defaultValue: this.props.element.min_label, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'min_label', 'value') })] }) }), this.props.element.hasOwnProperty('max_value') &&
                    _jsx("div", { className: "form-group", children: _jsxs("div", { className: "form-group-range", children: [_jsx("label", { className: "control-label", htmlFor: "rangeMax", children: _jsx(IntlMessages, { id: "max" }) }), _jsx("input", { id: "rangeMax", type: "number", className: "form-control", defaultValue: this.props.element.max_value, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'max_value', 'value') }), _jsx("input", { type: "text", className: "form-control", defaultValue: this.props.element.max_label, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'max_label', 'value') })] }) }), this.props.element.hasOwnProperty('default_value') &&
                    _jsx("div", { className: "form-group", children: _jsxs("div", { className: "form-group-range", children: [_jsx("label", { className: "control-label", htmlFor: "defaultSelected", children: _jsx(IntlMessages, { id: "default-selected" }) }), _jsx("input", { id: "defaultSelected", type: "number", className: "form-control", defaultValue: this.props.element.default_value, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'default_value', 'value') })] }) }), this.props.element.hasOwnProperty('static') && this.props.element.static &&
                    _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "control-label", children: _jsx(IntlMessages, { id: "text-style" }) }), _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "do-bold", className: "custom-control-input", type: "checkbox", checked: this_checked_bold, value: true, onChange: this.editElementProp.bind(this, 'bold', 'checked') }), _jsx("label", { className: "custom-control-label", htmlFor: "do-bold", children: _jsx(IntlMessages, { id: "bold" }) })] }), _jsxs("div", { className: "custom-control custom-checkbox", children: [_jsx("input", { id: "do-italic", className: "custom-control-input", type: "checkbox", checked: this_checked_italic, value: true, onChange: this.editElementProp.bind(this, 'italic', 'checked') }), _jsx("label", { className: "custom-control-label", htmlFor: "do-italic", children: _jsx(IntlMessages, { id: "italic" }) })] })] }), this.props.element.showDescription &&
                    _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "control-label", htmlFor: "questionDescription", children: _jsx(IntlMessages, { id: "description" }) }), _jsx(TextAreaAutosize, { type: "text", className: "form-control", id: "questionDescription", defaultValue: this.props.element.description, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'description', 'value') })] }), this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty('options') &&
                    _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "control-label", htmlFor: "correctAnswer", children: _jsx(IntlMessages, { id: "correct-answer" }) }), _jsx("input", { id: "correctAnswer", type: "text", className: "form-control", defaultValue: this.props.element.correct, onBlur: this.updateElement.bind(this), onChange: this.editElementProp.bind(this, 'correct', 'value') })] }), this.props.element.canPopulateFromApi && this.props.element.hasOwnProperty('options') &&
                    _jsxs("div", { className: "form-group", children: [_jsx("label", { className: "control-label", htmlFor: "optionsApiUrl", children: _jsx(IntlMessages, { id: "populate-options-from-api" }) }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-sm-6", children: _jsx("input", { className: "form-control", style: { width: '100%' }, type: "text", id: "optionsApiUrl", placeholder: "http://localhost:8080/api/optionsdata" }) }), _jsx("div", { className: "col-sm-6", children: _jsx("button", { onClick: this.addOptions.bind(this), className: "btn btn-success", children: _jsx(IntlMessages, { id: "populate" }) }) })] })] }), this.props.element.hasOwnProperty('options') &&
                    _jsx(DynamicOptionList, { showCorrectColumn: this.props.showCorrectColumn, canHaveOptionCorrect: canHaveOptionCorrect, canHaveOptionValue: canHaveOptionValue, data: this.props.preview.state.data, updateElement: this.props.updateElement, preview: this.props.preview, element: this.props.element }, this.props.element.options.length)] }));
    }
}
FormElementsEdit.defaultProps = { className: 'edit-element-fields' };
