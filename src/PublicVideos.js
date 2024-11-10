// src/components/PublicVideos.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import '../src/style.css';

function PublicVideos({ isSignedIn, balance, setBalance }) {
  const video = {
    id: 1,
    title: 'Exclusive Content Video',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    subscribers: 3500,
    amount: 50,
  };

  const [subscribed, setSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [comments, setComments] = useState([
    { id: 1, user: 'User1', text: 'Great content!', tips: 2 },
    { id: 2, user: 'User2', text: 'Very informative.', tips: 1 },
    { id: 3, user: 'User3', text: 'Love this video.', tips: 3 },
  ]);

  const suggestedVideos = [
    { id: 1, title: 'Suggested Video 1', views: 1245, subscribers: 850, imageUrl: 'https://via.placeholder.com/200x150' },
    { id: 2, title: 'Suggested Video 2', views: 764, subscribers: 540, imageUrl: 'https://via.placeholder.com/200x150' },
    { id: 3, title: 'Suggested Video 3', views: 1890, subscribers: 1200, imageUrl: 'https://via.placeholder.com/200x150' },
  ];

  // Subscribe function with modal popup
  const handleSubscribe = () => {
    if (!isSignedIn) {
      setShowModal(true);
      return;
    }
    if (!subscribed) {
      setBalance((prevBalance) => prevBalance - 5); // Use functional update
      setSubscribed(true);
    }
  };

  // Tip function with modal popup
  const handleTip = (userId) => {
    if (!isSignedIn) {
      setShowModal(true);
      return;
    }

    // Update balance and tips
    setBalance((prevBalance) => prevBalance - 1);

    // Update tips for the specific user
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === userId ? { ...comment, tips: comment.tips + 1 } : comment
      )
    );
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="main-container">
      <div className="container mt-4">
        <div className="row">
          {/* Main Video Section */}
          <div className="col-12 col-md-8">
            <div className="card video-card mb-4">
              <div className="card-body">
                <h2 className="card-title">{video.title}</h2>

                {/* Conditionally render iframe based on subscription */}
                {!subscribed ? (
                  <div className="video-placeholder d-flex justify-content-center align-items-center">
                    <p>Please subscribe to watch this content.</p>
                  </div>
                ) : (
                  <div className="video-container">
                    <iframe
                      className="embed-responsive-item"
                      width="800"
                      height="450"
                      src={video.url}
                      title="Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center mt-3">
                  {!subscribed ? (
                    <button className="btn btn-primary subscribe-btn" onClick={handleSubscribe}>
                      Subscribe for 5 STX
                    </button>
                  ) : (
                    <button className="btn btn-success" disabled>
                      Subscribed
                    </button>
                  )}
                </div>

                <div className="mt-3 video-info">
                  <strong>Subscribers:</strong> {video.subscribers} <br />
                  <strong>Amount Paid:</strong> {video.amount} STX
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className={`card comments-card`}>
              <div className="card-body">
                <h3 className="card-title">Comments</h3>
                {comments.map((comment) => (
                  <div key={comment.id} className="d-flex justify-content-between align-items-center mb-2 comment-item">
                    {/* Comment Text */}
                    <span>
                      <strong>{comment.user}</strong>: {comment.text}
                    </span>

                    {/* Tips and Tip Button on the Right */}
                    <div className="d-flex align-items-center">
                      <span>Tipped {comment.tips} STX</span> &nbsp; &nbsp;
                      <button
                        className="btn tip-btn"
                        onClick={() => handleTip(comment.id)}
                      >
                        +1 STX
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Suggested Videos Section */}
          <div className={`col-12 col-md-4`}>
            <div className={`card suggested-videos-card`}>
              <div className="card-body">
                <h3 className="card-title">Suggested Videos</h3>
                {suggestedVideos.map((suggested) => (
                  <div key={suggested.id} className="d-flex mb-3 suggested-video-item">
                    <img
                      src={suggested.imageUrl}
                      alt={suggested.title}
                      style={{ width:'100px', height:'100px', marginRight:'10px'}}
                      className='img-fluid suggested-video-img'
                    />
                    <div>
                      <h5>{suggested.title}</h5>
                      <small>{suggested.views} views | {suggested.subscribers} subscribers</small>
                    </div> 
                  </div> 
                ))}
              </div> 
            </div> 
          </div> 

        </ div > 

        {/* Sign-in Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton >
            <Modal.Title>Sign In Required</Modal.Title >
          </Modal.Header >
          <Modal.Body > You need to sign in to subscribe or tip other users.</Modal.Body >
          <Modal.Footer >
            <Button variant='secondary' onClick={handleCloseModal}> Close</Button >
          </Modal.Footer >
        </Modal>

      </ div >
      </div>
    );
}

export default PublicVideos;