import { useEffect, useState } from 'react';

// ant
import {
  Form,
  Select,
  notification,
  Popover
} from 'antd';

import UploadComponent from 'shared/components/upload/upload.component';

import './admin-song.scss';
import { apiLink } from 'shared/const';
import axios from 'axios';
import moment from 'moment';
import { AlbumModel, CategoryModel, ComponentModel, CountryModel } from 'shared/model';

const { Option } = Select;

function AdminSong({ tabStatus }: ComponentModel) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [base64MP3, setBase64MP3] = useState('');
  const [base64Image, setBase64Image] = useState('');
  const [validateUploadMP3, setValidateUploadMP3] = useState<any>('');
  const [validateUploadImage, setValidateUploadImage] = useState<any>('');
  const [countries, setcountries] = useState<any>([]);
  const [albums, setAlbums] = useState<any>([]);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {

    async function loadData() {
      const resultCountry = await axios.get(`${apiLink}/countries`);
      if (resultCountry && resultCountry.data && resultCountry.data.countries) {
        setcountries(resultCountry.data.countries);
      }

      const resultAlbums = await axios.get(`${apiLink}/albums`);
      if (resultAlbums && resultAlbums.data && resultAlbums.data.albums) {
        setAlbums(resultAlbums.data.albums);
      }

      const resultCategory = await axios.get(`${apiLink}/categories`);
      if (resultCategory && resultCategory.data && resultCategory.data.categories) {
        setCategories(resultCategory.data.categories);
      }
    }

    loadData();

    return () => { }
  }, [tabStatus])

  function openNotification(placement: any) {
    notification.success({
      className: "app-notification",
      message: 'Success!',
      placement,
      duration: 1
    });
  };

  function handleChangeMP3(base64Result: string, type: string) {
    setBase64MP3(base64Result);
    if (!base64Result) {
      setValidateUploadMP3('MP3 is not empty!');
    } else {
      setValidateUploadMP3('');
    }
  }

  function handleChangeImage(base64Result: string, type: string) {
    setBase64Image(base64Result);
    if (!base64Result) {
      setValidateUploadImage('Image is not empty!');
    } else {
      setValidateUploadImage('');
    }
  }

  function onFinish(results: any) {
    results['errorFields'] = [];
    if (!base64MP3) {
      results['errorFields'].push({
        errors: ["MP3 is not empty!"],
        name: ["song_url_music"]
      });
      setValidateUploadMP3('MP3 is not empty!');
    }
    if (!base64Image) {
      results['errorFields'].push({
        errors: ["Image is not empty!"],
        name: ["song_url_image"]
      });
      setValidateUploadMP3('Image is not empty!');
    }
    if (results.errorFields && results.errorFields.length === 0) {
      delete results['errorFields'];
    }
    if (!results.errorFields) {
      const resultData = { ...results };
      resultData.song_url_music = base64MP3;
      resultData.song_url_image = base64Image;
      resultData.song_personal_id_albums = '';
      resultData.created_at = moment().toISOString();

      axios.post(`${apiLink}/songs`, { song: resultData }).then(result => {
        setIsSubmit(!isSubmit);
        setBase64MP3('');
        setBase64Image('');
        form.resetFields();
        openNotification('topRight');
        
      })
    }
  };

  function contentPopOver(album: any) {
    return (
      <div>
        <p>Country: {album.album_country.country_name}</p>
        <p>Type: {album.album_category.category_name}</p>
      </div>
    )
  }
  return (
    <div className="app_category">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          song_name: '',
          song_singer: [],
          song_url_image: '',
          song_url_music: '',
          song_id_albums: '',
          song_category: '',
          created_at: ''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinish}
      >
        <div className="control_layout">
          <Form.Item
            name="song_id_albums"
            label="Album"
            className="control_item"
          >
            <Select>
              {albums && albums.map((a: AlbumModel) => {
                return <Option key={a._id} value={a._id}>
                  <Popover content={contentPopOver(a)} title="Title">
                    {a.album_name}
                  </Popover>
                </Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="song_country"
            label="Country"
            className="control_item"
          >
            <Select>
              {countries && countries.map((c: CountryModel) => <Option key={c._id} value={c._id}>{c.country_name}</Option>)}
            </Select>
          </Form.Item>
        </div>
        <div className="control_layout">
          <div className="control_layout">
            <Form.Item label="* Image" className="control_item">
              <UploadComponent
                listType='picture-card'
                showUploadList={true}
                limit={1}
                isSubmit={isSubmit}
                handleChangeImage={handleChangeImage}
              />
              {validateUploadMP3 ? <span style={{ color: 'red' }}>{validateUploadImage}</span> : null}
            </Form.Item>
            <Form.Item label="* MP3" className="control_item">
              <UploadComponent
                listType='picture-card'
                showUploadList={true}
                limit={1}
                isSubmit={isSubmit}
                handleChangeImage={handleChangeMP3}
              />
              {validateUploadMP3 ? <span style={{ color: 'red' }}>{validateUploadMP3}</span> : null}
            </Form.Item>
          </div>
          <Form.Item
            name="song_category"
            label="Types"
            className="control_item"
            rules={[{ required: true, message: 'Type is not empty!' }]}
          >
            <Select>
              {categories && categories.map((c: CategoryModel) => <Option key={c._id} value={c._id}>{c.category_name}</Option>)}
            </Select>
          </Form.Item>

        </div>
        <div>
          <button type="submit" className="upload_modal_btn styles.margin_left_10">Confirm</button>
        </div>
      </Form>
    </div>
  );
}

export default AdminSong;
