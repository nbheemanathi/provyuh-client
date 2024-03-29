import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Transition from "../../util/Transition";
import { AuthContext } from "../../context/auth";
import UserAvatar from "../../images/user-avatar-32.png";
import { ApolloConsumer } from "@apollo/client";
import { CachePersistor } from 'apollo3-cache-persist';

export default function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  function onLogout(client) {
    logout();
    const persistor = new CachePersistor({
      cache: client.cache,
      storage: window.localStorage,
    });
    client.clearStore().then(() =>{
      persistor.purge()
    });
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if(dropdown.current){
        if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target))
        return;
      }
      setDropdownOpen(false);      
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
            {user.username}
          </span>
          <svg
            className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>
      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <ApolloConsumer>
          {(client) => (
            <div
              ref={dropdown}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
            >
              <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
                <div className="font-medium text-gray-800">{user.username}</div>
                {/* <div className="text-xs text-gray-500 italic">Administrator</div> */}
              </div>
              <ul>
                <li>
                  <Link
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    to="/settings"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    to="/"
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      onLogout(client);
                    }}
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </ApolloConsumer>
      </Transition>
    </div>
  );
}
