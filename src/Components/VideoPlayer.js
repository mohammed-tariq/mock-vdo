import { useEffect, useRef, useState } from "react";
import { CiPlay1 , CiPause1 , CiHeart } from "react-icons/ci";
import { FaComment, FaHeart, FaShare } from "react-icons/fa";
import DisplayComments from '../Components/displayComments'

function VideoPlayer({ video, containerRef }) {
  const playPauseRef = useRef();
  const videoRef = useRef();

  const [isPlaying, setIsPlaying] = useState(true);
  const [showComment,setShowComment] =  useState(false)
  const [isLiked, setIsLiked] = useState(video.reaction.isLiked);

  useEffect(() => {
    containerRef.current.addEventListener("scroll", handleVideo);
    // setIsPlaying(!videoRef.current.paused);
    // window.addEventListener("blur", () => {
    //   if (isActiveVideo(videoRef)) {
    //     videoRef.current.pause();
    //     setIsPlaying(false);
    //   }
    // });

    // window.addEventListener("focus", () => {
    //   if (isActiveVideo(videoRef)) {
    //     videoRef.current.play();
    //     setIsPlaying(true);
    //   }
    // });
  }, [containerRef]);



  const handleComment = ()=>{
    setShowComment(!showComment)
  }


  async function handleVideo() {
    const videoTop = videoRef.current.getBoundingClientRect().top;

    if (videoTop > 0 && videoTop <= 150) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        setIsPlaying(false);
        videoRef.current.pause();
      }
    } else {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }

  return (
    <div className="vdo-main">
      <div className="vdo-main-video">
        <div className="video">
          <video
            ref={videoRef}
            onClick={function (e) {
              if (!isPlaying) {
                videoRef.current.play();
                setIsPlaying(true);
              } else {
                videoRef.current.pause();
                setIsPlaying(false);
              }
            }}
            disableRemotePlayback
            playsInline
            loop
            src={video.videoUrl}
          ></video>
          <div className="controls">
            <span
              onClick={() => {
                if (!isPlaying) {
                  videoRef.current.play();
                  setIsPlaying(true);
                } else {
                  videoRef.current.pause();
                  setIsPlaying(false);
                }
              }}
            >



                {isPlaying ? <CiPlay1 /> : <CiPause1 /> }
            </span>
          </div>
          <div
            ref={playPauseRef}
            onClick={() => {
              videoRef.current.play();
              setIsPlaying(true);
            }}
            className={`play-pause ${isPlaying ? "" : "show-play-pause"}`}
          >
            <CiPlay1 />
          </div>
          {showComment && <div className="comment-section">
          <DisplayComments comment={video.comments}  />
      </div>}
        </div>
        {!showComment && <div className="foot">
            <div className="title">{video.title}</div>
            <div className="user-info">
              <div>
                <span>{video.username}</span>
              </div>
            </div>
          </div>}
        <div className="reaction">
          <div
            className=""
            onClick={() => {
              setIsLiked(!isLiked);
            }}
          >

            <span className={`${isLiked ? 'like':'unlike'}`}>
                <FaHeart />
              </span>
           

            <span className="value">{video.reaction.likes}</span>
          </div>
          <div onClick={handleComment}>
          <FaComment />
            <span className="value">{video.reaction.comments}</span>
          </div>
          <div>
          <FaShare />
          </div>
     
        </div>
      </div>
    </div>
  );
}

function isActiveVideo(videoRef) {
  const videoTop = videoRef.current.getBoundingClientRect().top;
  return videoTop > 0 && videoTop <= 150;
}

export default VideoPlayer;
