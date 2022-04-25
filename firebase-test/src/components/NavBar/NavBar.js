import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Button, VStack, Switch, useColorMode, IconButton } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { useState } from 'react';

function NavBar() {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === 'dark';
	const [ display, changeDisplay ] = useState('none');
	return (
		<Flex w="100vw" justify="flex-end" border="1px solid black">
			<Flex align="center" pos="relative" right="1rem">
				<Flex display={[ 'none', 'none', 'flex', 'flex' ]}>
					<Button varient="link" aria-label="Home" m={2} w="100%">
						<Link to="/">Home</Link>
					</Button>
					<Button varient="link" aria-label="Add-Holiday" m={2} w="100%">
						<Link to="/addaholiday">Add A Holiday</Link>
					</Button>
					<Button varient="link" aria-label="Bucket-List" m={2} w="100%">
						<Link to="/bucketlist">My Bucket List</Link>
					</Button>
				</Flex>
				<Switch isChecked={isDark} onChange={toggleColorMode} />

				<IconButton
					aria-label="Open Menu"
					size="md"
					mr={2}
					icon={<HamburgerIcon />}
					display={[ 'flex', 'flex', 'none', 'none' ]}
					onClick={() => changeDisplay('flex')}
				/>
				<Flex
					w="100vw"
					bgColor="gray.50"
					zIndex={20}
					h="100vh"
					pos="fixed"
					top="0"
					left="0"
					overflow="auto"
					flexDir="column"
					display={display}
				>
					<Flex justify="flex-end">
						<IconButton
							mt={2}
							mr={2}
							aria-label="Close Menu"
							size="lg"
							icon={<CloseIcon />}
							onClick={() => changeDisplay('none')}
						/>
					</Flex>
					<Flex flexDir="coloum" align="center">
						<Button varient="ghost" aria-label="Home" m={5} w="100%">
							<Link to="/">Home</Link>
						</Button>
						<Button varient="ghost" aria-label="Add-Holiday" m={5} w="100%">
							<Link to="/addaholiday">Add A Holiday</Link>
						</Button>
						<Button varient="ghost" aria-label="Bucket-List" m={5} w="100%">
							<Link to="/bucketlist">My Bucket List</Link>
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default NavBar;

// <Flex>
// 			<Flex pos="fixed" top="1rem" right="1rem" align="center">
// 				{/* Desktop */}
// 				<Flex display=>

// 				</Flex>

// 				{/* MobileIcon */}
// 				<IconButton
// 					aria-label="Open Menu"
// 					size="lg"
// 					mr={2}
// 					icon={<HamburgerIcon />}
// 					display={[ 'flex', 'flex', 'none', 'none' ]}
// 					onClick={() => changeDisplay}
// 				/>

// 				<Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
// 			</Flex>
// 			{/* MobileContent */}
// 			<Flex bgColor="gray.50" overflowY="auto" flexDir="column">
// 			<Flex justify="flex-end">
//
// 	</Flex>
// 	<Flex flexDir="column" align="center">
// 					<Link to="/">Home</Link>

// 					<Button varient="ghost" aria-label="Add-Holiday" m={5} w="100%">
// 						<Link to="/addaholiday">Add A Holiday</Link>
// 					</Button>
// 					<Button varient="ghost" aria-label="Bucket-List" m={5} w="100%">
// 						<Link to="/bucketlist">My Bucket List</Link>
// 					</Button>
// 				</Flex>
// 			</Flex>
// 		</Flex>
