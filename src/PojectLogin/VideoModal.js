import React from 'react';
import './VideoModal.css';

const VideoModal = ({ isOpen, videoUrl, closeModal }) => {
  if (!isOpen) return null;

  const formattedVideoUrl = `https://www.youtube.com/embed/${videoUrl.split('/').pop()}`; // Format the URL

  return (
    <div className="modal-overlay-youtube-video" onClick={closeModal}>
      <div className="modal-content-youtube-video" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-youtube-video" onClick={closeModal}>X</button>
        <iframe
  width="800" // Increased width
  height="450" // Increased height
  src={formattedVideoUrl}
  title="YouTube video - How to Register for Testdesk"
  name="testdesk_video_iframe" // Added name for identification
  frameBorder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

      </div>
    </div>
  );
};

export default VideoModal;
