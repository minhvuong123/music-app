import { useEffect, useState } from 'react';

// ant
import {
  Form,
  Input,
  Select,
  notification
} from 'antd';

import UploadComponent from 'shared/components/upload/upload.component';

import './admin-album.scss';
import { apiLink } from 'shared/const';
import axios from 'axios';
import moment from 'moment';
import { AlbumModel, AlbumsModel, CategoryModel, ComponentModel, CountryModel } from 'shared/model';

const { Option } = Select;

function AdminAlbum({ tabStatus }: ComponentModel) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [validateUploadImage, setValidateUploadImage] = useState<any>('');
  const [base64Image, setBase64] = useState('');
  const [imageType, setImageType] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    async function loadData() {
      const resultCategory = await axios.get(`${apiLink}/categories`);
      if (resultCategory && resultCategory.data && resultCategory.data.categories) {
        setCategories(resultCategory.data.categories);
      }

      const resultCountry = await axios.get(`${apiLink}/countries`);
      if (resultCountry && resultCountry.data && resultCountry.data.countries) {
        setCountries(resultCountry.data.countries);
      }

      const resultAlbumList = await axios.get(`${apiLink}/albumList`);
      if (resultAlbumList && resultAlbumList.data && resultAlbumList.data.albumList) {
        setAlbumList(resultAlbumList.data.albumList);
      }
    }

    loadData();

    return () => {}
  }, [tabStatus]);

  function openNotification(placement: any){
    notification.success({
      className: "app-notification",
      message: 'Success!',
      placement,
      duration: 1
    });
  };

  function handleChangeImage(base64Result: string, type: string) {
    setBase64(base64Result);
    setImageType(type);
    if (!base64Result) {
      setValidateUploadImage('Images is not empty!');
    } else {
      setValidateUploadImage('');
    }
  }

  function onFinish(values: AlbumModel) {
    const resultData = {...values};
    resultData.album_url_image = base64Image;
    resultData.created_at = moment().toISOString();
    
    axios.post(`${apiLink}/albums`, { album: resultData, imageType: imageType }).then(result => {
      setIsSubmit(!isSubmit);
      form.resetFields();
      openNotification('topRight');
    })
  }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          album_name: '',
          album_category: '',
          album_country: '',
          created_at: ''
        }}
        onFinish={onFinish}
      >
        <div className="control_layout">
          <Form.Item
            name="album_name"
            label="Name"
            className="control_item"
            rules={[{ required: true, message: 'Name is not empty!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="album_category"
            label="Types"
            className="control_item"
            rules={[{ required: true, message: 'Type is not empty!' }]}
          >
            <Select>
              { categories && categories.map((c: CategoryModel)  => <Option key={c._id} value={c._id}>{c.category_name}</Option>) }
            </Select>
          </Form.Item>
        </div>
        <div className="control_layout">
          <Form.Item
            name="album_country"
            label="Country"
            className="control_item"
          >
            <Select>
              { countries && countries.map((c: CountryModel) => <Option key={c._id} value={c._id}>{c.country_name}</Option>) }
            </Select>
          </Form.Item>
          <Form.Item
            name="album_listShow"
            label="List Show"
            className="control_item"
          >
            <Select>
              { albumList && albumList.map((a: AlbumsModel) => <Option key={a._id} value={a._id}>{a.albumList_name}</Option>) }
            </Select>
          </Form.Item>
        </div>
        <div className="control_layout">
          <Form.Item label="* Image" className="control_item">
            <UploadComponent
              listType='picture-card'
              showUploadList={true}
              limit={1}
              isSubmit={isSubmit}
              handleChangeImage={handleChangeImage}
            />
            {validateUploadImage ? <span style={{ color: 'red' }}>{validateUploadImage}</span> : null}
          </Form.Item>
        </div>
        <div>
          <button type="submit" className="upload_modal_btn margin_left_10">Confirm</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAlbum;
