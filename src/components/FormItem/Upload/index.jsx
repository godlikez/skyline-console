// Copyright 2021 99cloud
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { Component } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { isArray } from 'lodash';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
    };
  }

  get progress() {
    return {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    };
  }

  onChange = (info) => {
    if (info.file.status !== 'uploading') {
      // eslint-disable-next-line no-console
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  beforeUpload = (file) => {
    this.setState(
      {
        file,
      },
      () => {
        const { onChange } = this.props;
        if (onChange) {
          onChange(file);
        }
      }
    );
    return false;
  };

  render() {
    const { value } = this.props;
    const { file } = this.state;
    let fileList;
    if (value) {
      fileList = isArray(value) ? value : [value];
    } else {
      fileList = file ? [file] : [];
    }
    const props = {
      ...this.props,
      name: 'file',
      action: '',
      headers: {
        authorization: 'authorization-text',
      },
      onChange: this.onChange,
      progress: this.progress,
      beforeUpload: this.beforeUpload,
      fileList,
    };
    return (
      <Upload {...props}>
        <Button>
          <UploadOutlined /> {t('Click to Upload')}
        </Button>
      </Upload>
    );
  }
}