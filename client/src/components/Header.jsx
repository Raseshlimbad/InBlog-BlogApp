// import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
// import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
// import { AiOutlineSearch } from "react-icons/ai";
// import { FaMoon } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleTheme } from "../redux/theme/themeSlice";
// import { SignoutSuccess } from "../redux/user/userSlice";
// import { useEffect, useState } from "react";

// export default function Header() {
//   const path = useLocation().pathname;
//   const { currentUser } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [searchTerm , setSearchTerm] = useState('');
//   // console.log(searchTerm);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if(searchTermFromUrl){
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

//   const handleSignout = async (e) => {
//     try {
//       const res = await fetch('/api/user/signout', {
//         method: "POST",
//       });
//       const data = await res.json();
//       if(!res.ok){
//         console.log(data.message);
//       }else{
//         dispatch(SignoutSuccess());
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = useParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   return (
//     <Navbar className="border-b-2">
//       <Link
//         to="/"
//         className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
//       >
//         <span className="px-2 py-1 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 rounded-lg text-white">
//           In
//         </span>
//         Blog
//       </Link>
//       <form onSubmit={handleSubmit}>
//         <TextInput
//           type="text"
//           placeholder="search..."
//           rightIcon={AiOutlineSearch}
//           className="hidden lg:inline"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </form>
//       <Button className="w-12 h-10 lg:hidden items-center" color="gray" pill>
//         <AiOutlineSearch />
//       </Button>
//       <div className="flex gap-2 md:order-2">
//         <Button
//           className="w-12 h-10 items-center"
//           color="gray"
//           pill
//           onClick={() => dispatch(toggleTheme())}
//         >
//           <FaMoon />
//         </Button>
//         {currentUser ? (
//           <Dropdown
//             arrowIcon={false}
//             inline
//             label={
//               <Avatar alt="user" img={currentUser.profilePicture} rounded />
//             }
//           >
//             <Dropdown.Header>
//               <span className="block text-sm">@{currentUser.username}</span>
//               <span className="block text-sm font-medium truncate">
//                 @{currentUser.email}
//               </span>
//             </Dropdown.Header>
//             <Link to="/dashboard?tab=profile">
//               <Dropdown.Item>Profile</Dropdown.Item>
//             </Link>
//             <Dropdown.Divider />
//             <Dropdown.Item onClick={handleSignout}>Sign Out </Dropdown.Item>
//           </Dropdown>
//         ) : (
//           <Link to="/sign-in">
//             <Button gradientDuoTone="purpleToBlue" outline>
//               Sign In
//             </Button>
//           </Link>
//         )}
//         <Navbar.Toggle />
//       </div>
//       <Navbar.Collapse>
//         <Navbar.Link active={path === "/"} as={"div"}>
//           <Link to="/">Home</Link>
//         </Navbar.Link>
//         <Navbar.Link active={path === "/about"} as={"div"}>
//           <Link to="/about">About</Link>
//         </Navbar.Link>
//         <Navbar.Link active={path === "/projects"} as={"div"}>
//           <Link to="/projects">Projects</Link>
//         </Navbar.Link>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }







// --------------------------------------------------------------------------------------------------------------------------------




import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { SignoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2'>
       <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 rounded-lg text-white">
          In
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
