

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(8); // Default value or obtained from API
  
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    fetchNews(currentPage); // Fetch news for the current page
  }, [currentPage, navigate, user]);

  const fetchNews = async (page) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=tesla&page=${page + 1}&pageSize=8&sortBy=publishedAt&apiKey=428d3e85d9fd4744a03f099bdccd4a50`
      );
      setNews(res.data.articles);
      setTotalPages(Math.ceil(res.data.totalResults / 9)); // Assuming 9 articles per page
    } catch (error) {
      console.log(error);
      toast.error('Error fetching news');
    }
    setIsLoading(false);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Update the current page
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-16"> {/* Responsive padding */}
      <h1 className='text-4xl font-bold text-center mt-10'>Posts You May Like</h1>
      
      <ReactPaginate
        className='flex justify-center items-center space-x-4 py-4 bg-gray-100' // Centered with padding
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center space-x-4'} // Horizontal spacing
        pageClassName={'page-item'}
        pageLinkClassName={'px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100'}
        previousClassName={'page-item'}
        previousLinkClassName={'px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100'}
        nextClassName={'page-item'}
        nextLinkClassName={'px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-100'}
        activeClassName={'bg-blue-500 text-white rounded-xl'} // Style for active page
      />
      
      <div className='flex flex-wrap gap-7 justify-center mt-12'> {/* Adjusted for smaller screens */}
        {isLoading ? (
          <p>Loading more news...</p> // Loading indicator
        ) : (
          news.map((item, i) => (
            <Link
              to={{ pathname: `/news/${encodeURIComponent(item.title)}` }}
              key={i}
              className='w-full sm:w-72 lg:w-60 xl:w-72 rounded overflow-hidden shadow-lg' // Responsive width
            >
              <img className='w-full' src={item.urlToImage} alt='News image' />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>Author: {item.author}</div>
                <p className='text-gray-700 text-base font-semibold text-md'>
                  <span className='text-lg font-bold'>Title:</span> {item.title}
                </p>
                <p className='p-3 mt-2'>
                  <span className='text-lg font-semibold'>Content:</span> {item.content}
                </p>
              </div>
              <div className='px-6 pt-4 pb-2'>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  Published At: {item.publishedAt}
                </span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                  Source: {item?.source?.name}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
