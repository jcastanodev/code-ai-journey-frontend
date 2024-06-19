import { SetApiKey } from "@components/ai/SetApiKey";
import { useAppSelector } from "@store/hooks";
import { ChatBot } from "./chatBot/ChatBot";
import { Box, Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "@components/common/material-ui/CustomTabPanel";
import React from "react";
import { Tattoo } from "./tattoo/Tattoo";

export function AIPlayground() {
	const isDarkMode = useAppSelector((state) => state.appSetting.isDarkMode);
    const apiKey = useAppSelector((state) => state.aiPlayground.apiKey);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (<>
        <SetApiKey />
        {apiKey && (<>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ color: isDarkMode ? 'white' : 'black' }} label="ChatBot" {...a11yProps(0)} />
                    <Tab sx={{ color: isDarkMode ? 'white' : 'black' }} label="Tattoo" {...a11yProps(1)} />
                    <Tab sx={{ color: isDarkMode ? 'white' : 'black' }} label="Trivia" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ChatBot />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Tattoo />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
        </>)}
    </>);
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
