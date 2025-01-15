import { faArrowLeft, faTrash, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addJournalApi, deletejornalApi, getJournalApi } from '../services/allApi';
import { Link } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

const formats = [
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'bullet',
];

function Journal() {
  const [content, setContent] = useState('');
  const [journalData, setJournalData] = useState([]);
  const [filteredJournalData, setFilteredJournalData] = useState([]);
  const [addedJournalstatus, setAddedJournalstatus] = useState('');
  const [deletestatus, setDeletestatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const getJournalData = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await getJournalApi(reqHeader);
      setJournalData(result.data);
      setFilteredJournalData(result.data); // Initially show all data
    }
  };

  const extractTextFromHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const result = await deletejornalApi(id, reqHeader);
      if (result.status === 200) {
        alert('Deleted successfully');
        setDeletestatus(result);
      } else {
        alert('Something went wrong');
      }
    }
  };

  const handlePublish = async () => {
    const plainText = extractTextFromHTML(content);
    const newEntry = { text: plainText, date: new Date().toLocaleDateString() };

    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const reqbody = new FormData();
      reqbody.append('text', newEntry.text);
      reqbody.append('date', newEntry.date);

      const result = await addJournalApi(reqbody, reqHeader);
      if (result.status === 200) {
        alert(result.data.message);
        setAddedJournalstatus(result.data);
        setContent('');
      } else {
        alert('Something went wrong');
      }
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      const filtered = journalData.filter((entry) => entry.date === formattedDate);
      setFilteredJournalData(filtered);
    }
  };

  const formatDate = (selectedDate) => {
    const date = new Date(selectedDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const resetFilter = () => {
    setFilteredJournalData(journalData);
    setSelectedDate('');
  };

  useEffect(() => {
    getJournalData();
  }, [addedJournalstatus, deletestatus]);

  return (
    <>
      <div className="min-h-[100vh] bg-[#1f1f1f]">
        <div className="p-4">
          <Link to="/">
            <button className="btn mt-10 ms-0 lg:ms-20 text-white flex items-center">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 fa-2x" />
            </button>
          </Link>
        </div>

        <h1 className="text-center text-white text-[60px] pt-12">
          Daily Gratitude Journal
        </h1>
        <h1 className="text-center text-white mt-10">
          "Writing down your dreams makes it more likely they will come true."
        </h1>
        <h1 className="text-center text-white mt-4">John C. Maxwell</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 mt-10">
          <div className="hidden lg:block col-span-2"></div>
          <div className="col-span-1 lg:col-span-8 px-4 lg:px-0">
            <div className="bg-[#f0eded] lg:p-6 py-10 px-4 rounded-md shadow-lg">
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Write 5 things you are grateful for today... or write how was your day...  what did you today..."
              />
              <button
                onClick={handlePublish}
                className="btn p-3 bg-slate-500 mt-4 text-white w-full lg:w-auto"
              >
                Add to Journal
              </button>
            </div>
          </div>
          <div className="hidden lg:block col-span-2"></div>
        </div>

       <div className='mt-10'>
          <h1 className="text-center text-white text-[40px]">
              Your Recent Journals
            </h1>
       </div>
        <div className="flex justify-between items-center ps-32 pt-12">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
            <input
              type="date"
              className="p-2 rounded-sm bg-slate-700 text-white"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <button
              onClick={resetFilter}
              className="btn p-2 bg-[#817272] text-white rounded-sm"
            >
              Show All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-1"></div>
          <div className="col-span-10 mt-10 grid lg:grid-cols-3 grid-cols-1 gap-5 text-[#dddbdb] my-10">
            {filteredJournalData.map((entry, index) => (
              <div key={index} className="bg-[gray] p-5 rounded-md">
                <div className="flex justify-between">
                  <p className="text-white">DATE : {entry?.date}</p>
                  <button className="btn" onClick={() => handleDelete(entry?._id)}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: 'white' }} />
                  </button>
                </div>
                <h1 className="text-center text-[20px] my-5">Journal Entry</h1>
                <hr className="my-3" />
                <p>{entry.text}</p>
              </div>
            ))}
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </>
  );
}

export default Journal;
