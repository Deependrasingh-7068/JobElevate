import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [text, setText] = useState(""); // Text being typed
  const [loopNum, setLoopNum] = useState(0); // Phrase index
  const [isTyping, setIsTyping] = useState(true); // Control typing and deletion
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const phrases = ["Dream Jobs", "Amazing Roles", "Future Jobs", "Career Opportunities"]; // Phrases to type
  const typingSpeed = 150; // Speed of typing animation
  const pauseTime = 2000; // Time to pause before typing next phrase

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  useEffect(() => {
    const typeWriterEffect = () => {
      const fullTxt = phrases[loopNum % phrases.length];
      if (isTyping && text.length < fullTxt.length) {
        setText((prevText) => prevText + fullTxt[text.length]);
      } else if (text === fullTxt && isTyping) {
        setIsTyping(false); // Stop typing once the full phrase is typed
        setTimeout(() => {
          setIsTyping(true); // Start typing again after pause
          setText(""); // Clear text before starting the next phrase
          setLoopNum((prev) => prev + 1); // Move to the next phrase
        }, pauseTime);
      }
    };

    const typingInterval = setInterval(typeWriterEffect, typingSpeed); // Calls the effect every interval

    // Cleanup on unmount
    return () => clearInterval(typingInterval);
  }, [text, isTyping, loopNum]); // Re-run effect when text, isTyping, or loopNum changes

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-6 py-3 rounded-full bg-gray-100 text-[#6A0DAD] font-bold text-lg shadow-md">
          Your Dream Job Starts Here!
        </span>

        <h1 className="text-5xl font-bold">
          Search, Apply & <br />
          Get Your{" "}
          <span className="relative inline-block text-[#6A38C2]">
            <span className="wrap">{text}</span>
          </span>
        </h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
