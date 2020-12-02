import React, { Component } from 'react'
import FileUpload from "apollo-react/components/FileUpload";


const allowedTypes = ['.doc', '.pdf', '.docx','application/pdf','application/msword','wordprocessingml'];
const maxSize = 1500000;
class CustomFileUpload extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedFiles:[]
        }
    }

    handleUpload = (selectedFiles) => {
        const { selectedFiles: existingFiles } = this.state;
        const {handleFileUploadError,setUploadFile}=this.props;
    
        // set loader and wait for some API to respond
        this.setState(
          {
            selectedFiles: [
              ...existingFiles,
              ...selectedFiles.map((item) => {
                item.loading = true;
                return item;
              }),
            ],
          },
          () =>
            setTimeout(() => {
              // custom validations
              const files = selectedFiles.map((file) => {
                file.loading = false;
                if (
                  allowedTypes.length &&
                  !allowedTypes.filter((type) => file.type.includes(type)).length
                  ) {
                //   file.errorMessage = `${
                //     file.name.split('.')[file.name.split('.').length - 1]
                //   } format is not supported`;
                file.errorMessage='Please upload PDF or Word format only';
                  handleFileUploadError('Please upload PDF or Word format only', true, 'uploadFile');
                } else if (maxSize && file.size > maxSize) {
                  file.errorMessage = `File is too large (max is ${maxSize} bytes)`;
                  handleFileUploadError('`File is too large (max is ${maxSize} bytes', true, 'uploadFile');
                } else {
                    handleFileUploadError(" ", false, 'uploadFile')
                }
                return file;
              });
    
              this.setState({ selectedFiles: [...existingFiles, ...files] },
                ()=>{
                    setUploadFile(this.state.selectedFiles, 'uploadFile');
                });
            }, 1000)
        );
      };
    
      handleDelete = (file) => {
        const { selectedFiles: old } = this.state;
        const {setUploadFile}=this.props;
        const selectedFiles = old.filter((item) => item.name !== file.name);
    
        this.setState({ selectedFiles },  ()=>{
            setUploadFile(this.state.selectedFiles, 'uploadFile');
        });
      };

    render(){
        const {selectedFiles, handleDelete, handleUpload}=this.props;
        return(
            <FileUpload
            value={this.state.selectedFiles}
            onUpload={this.handleUpload}
            onFileDelete={this.handleDelete}
            // label="Place the protocol document in PDF or Word format below"
            maxItems={1}
            // {...props}
            fullWidth
          />
        )
    }
}

export default CustomFileUpload;