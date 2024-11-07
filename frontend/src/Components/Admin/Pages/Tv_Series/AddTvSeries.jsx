import React, { useState } from 'react';
import { API_URLS } from '../../../../Apis/Globalapi';

const AddTVSeries = () => {
  const [movieData, setMovieData] = useState({
    tmdbId: '',
    title: '',
    slug: '',
    description: '',
    actors: '',
    directors: '',
    writers: '',
    imdbRating: '',
    releaseDate: '',
    countries: 'India',
    genres: 'Action, Comedy',
    runtime: '',
    freePaid: 'Paid',
    trailerUrl: '',
    videoQuality: '4K',
    thumbnail: null,
    poster: null,
    sendNewsletter: false,
    sendPushNotification: false,
    publish: false,
    enableDownload: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovieData({
      ...movieData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };



  const handleFileChange = (e) => {
    const { name } = e.target;
    setMovieData({
      ...movieData,
      [name]: e.target.files[0],
    });
  };

  const handleFetch = async () => {
    // Logic to fetch movie data from TMDB using tmdbId
    console.log('Fetching movie data for TMDB ID:', movieData.tmdbId);

    // Example fetch (update this with your actual API logic)
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${movieData.tmdbId}?api_key=YOUR_API_KEY`);
      const data = await response.json();

      // Update state with fetched data
      setMovieData((prevState) => ({
        ...prevState,
        title: data.name || '',
        description: data.overview || '',
        releaseDate: data.first_air_date || '',
        // Set other fields based on the fetched data
      }));
    } catch (error) {
      console.error('Error fetching data from TMDB:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const {
        tmdbId,
        title,
        slug,
        description,
        actors,
        directors,
        writers,
        imdbRating,
        releaseDate,
        countries,
        genres,
        runtime,
        freePaid,
        trailerUrl,
        videoQuality,
        sendNewsletter,
        sendPushNotification,
        publish,
        enableDownload,
        thumbnail,
        poster,
      } = movieData;
  
      // Prepare the payload
      const moviePayload = {
        tmdbId,
        title,
        slug,
        description,
        actors: JSON.stringify(actors), // Ensure this is sent as a JSON string
        directors: JSON.stringify(directors), // Ensure this is sent as a JSON string
        writers: JSON.stringify(writers), // Ensure this is sent as a JSON string
        imdbRating,
        releaseDate,
        countries: JSON.stringify(countries), // Ensure this is sent as a JSON string
        genres: JSON.stringify(genres), // Ensure this is sent as a JSON string
        runtime,
        freePaid,
        trailerUrl,
        videoQuality,
        sendNewsletter,
        sendPushNotification,
        publish,
        enableDownload,
      };
  
      // Convert thumbnail and poster to base64
      if (thumbnail) {
        moviePayload.thumbnail = await fileToBase64(thumbnail);
      }
  
      if (poster) {
        moviePayload.poster = await fileToBase64(poster);
      }
  
      // Make the POST request
      const response = await fetch(API_URLS.AddTvSeries, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moviePayload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add TV Series: ${errorData.message || 'Unknown error'}`);
      }
  
      const data = await response.json();
      console.log('TV Series added successfully:', data);
      alert("TV Series added successfully");
      window.location.reload();
  
    } catch (error) {
      console.error('Error adding TV Series:', error);
      alert(`Error: ${error.message}`); // Display the error message
    }
  };
  
  // Helper function to convert a file to a base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]); // Return only the base64 part
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Add TV Series</h2>

      <div className="flex justify-center mb-6 flex-col items-center">
        <div>
          <h1 className='bg-blue-500 text-white font-bold capitalize py-2 px-4 rounded-md mb-2'>IMPORT MOVIES/VIDEOS FROM TMDB</h1>
        </div>
        <div>
          <input
            type="text"
            name="tmdbId"
            value={movieData.tmdbId}
            onChange={handleInputChange}
            className="p-2 px-8 border rounded mr-2"
            placeholder="Enter TMDB ID"
          />
          <button
            onClick={handleFetch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Fetch
          </button>
        </div>
      </div>

      <div className="p-6 shadow-md rounded space-y-4 flex flex-col md:flex-row gap-5">
        {/* Movie Info Section */}
        <div className="bg-white flex-1 p-4 space-y-4">
          <h3 className="text-lg font-semibold">Movie Info</h3>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1">Slug (https://admin.hookflix.com/watch/slug)</label>
            <input
              type="text"
              name="slug"
              value={movieData.slug}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={movieData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>

          {/* Actors */}
          <div>
            <label className="block text-sm font-medium mb-1">Actors</label>
            <input
              type="text"
              name="actors"
              value={movieData.actors}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Directors */}
          <div>
            <label className="block text-sm font-medium mb-1">Directors</label>
            <input
              type="text"
              name="directors"
              value={movieData.directors}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Writers */}
          <div>
            <label className="block text-sm font-medium mb-1">Writers</label>
            <input
              type="text"
              name="writers"
              value={movieData.writers}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* IMDb Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">IMDb Rating</label>
            <input
              type="text"
              name="imdbRating"
              value={movieData.imdbRating}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={movieData.releaseDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Countries */}
          <div>
            <label className="block text-sm font-medium mb-1">Countries</label>
            <select
              name="countries"
              value={movieData.countries}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-medium mb-1">Genres</label>
            <input
              type="text"
              name="genres"
              value={movieData.genres}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Action, Comedy"
            />
          </div>

          {/* Runtime */}
          <div>
            <label className="block text-sm font-medium mb-1">Runtime</label>
            <input
              type="text"
              name="runtime"
              value={movieData.runtime}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Free/Paid */}
          <div>
            <label className="block text-sm font-medium mb-1">Free or Paid</label>
            <select
              name="freePaid"
              value={movieData.freePaid}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Paid">Paid</option>
              <option value="Free">Free</option>
            </select>
          </div>

          {/* Trailer URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Trailer URL</label>
            <input
              type="text"
              name="trailerUrl"
              value={movieData.trailerUrl}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Video Quality */}
          <div>
            <label className="block text-sm font-medium mb-1">Video Quality</label>
            <select
              name="videoQuality"
              value={movieData.videoQuality}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="4K">4K</option>
            </select>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white flex-1 p-4 space-y-4">
          <h3 className="text-lg font-semibold">Media</h3>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleFileChange}
              className="w-full border rounded"
              accept="image/*"
            />
          </div>

          {/* Poster Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Poster</label>
            <input
              type="file"
              name="poster"
              onChange={handleFileChange}
              className="w-full border rounded"
              accept="image/*"
            />
          </div>
        </div>
      </div>

      {/* Newsletter and Notifications */}
      <div className="bg-white p-4 rounded mt-4">
        <h3 className="text-lg font-semibold">Settings</h3>

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="sendNewsletter"
            checked={movieData.sendNewsletter}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label>Send Newsletter</label>
        </div>

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="sendPushNotification"
            checked={movieData.sendPushNotification}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label>Send Push Notification</label>
        </div>

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="publish"
            checked={movieData.publish}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label>Publish</label>
        </div>

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="enableDownload"
            checked={movieData.enableDownload}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label>Enable Download</label>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add TV Series
        </button>
      </div>
    </div>
  );
};

export default AddTVSeries;
