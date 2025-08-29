import TaskList from './components/TaskList'
import ColorModeSwitch from './components/ColorModeSwitch'
import stories from './data/stories'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box } from '@chakra-ui/react';

function App() {
    return (
        <Box>
            <Navbar />
                <TaskList todos={stories} />
            <Footer />
        </Box>
    )
}

export default App
