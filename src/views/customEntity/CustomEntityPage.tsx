import { CustomEntityCreate } from "@components/customEntity/CustomEntityCreate";
import { BaseLayout } from "@layouts/BaseLayout";
import { Tabs, TabsList, Tab, TabPanel } from "@mui/base";

export function CustomEntityPage() {
	const tabClassName = 'font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0 focus:shadow-outline-purple-light';
	const selectedTabClassName = 'text-primary-selected bg-primary-selected';
	const unselectedTabClassName = 'hover:bg-primary-hover';
	const disabledTabClassName = 'cursor-not-allowed opacity-50';
	const undisabledTabClassName = 'cursor-pointer';
	return (
		<BaseLayout className="container px-2 pt-0 mx-auto mt-0">
			<div className="p-2 text-center rounded-none bg-primary">
				<h1>Custom Entity 2</h1>
			</div>
			<Tabs defaultValue={1}>
				<TabsList className="flex items-center content-between justify-center shadow-lg bg-primary text-primary text-md min-w-tabs-list rounded-b-xl">
					<Tab
					slotProps={{
						root: ({ selected, disabled }) => ({
						className: `${
							selected ? selectedTabClassName : unselectedTabClassName
						} ${
							disabled ? disabledTabClassName : undisabledTabClassName
						} ${tabClassName}`,
						}),
					}}
					value={1}
					>
					Create
					</Tab>
					<Tab
					slotProps={{
						root: ({ selected, disabled }) => ({
						className: `${
							selected ? selectedTabClassName : unselectedTabClassName
						} ${
							disabled ? disabledTabClassName : undisabledTabClassName
						} ${tabClassName}`,
						}),
					}}
					value={2}
					>
					Read
					</Tab>
					<Tab
					slotProps={{
						root: ({ selected, disabled }) => ({
						className: `${
							selected ? selectedTabClassName : unselectedTabClassName
						} ${
							disabled ? disabledTabClassName : undisabledTabClassName
						} ${tabClassName}`,
						}),
					}}
					value={3}
					>
					Update
					</Tab>
					<Tab
					slotProps={{
						root: ({ selected, disabled }) => ({
						className: `${
							selected ? selectedTabClassName : unselectedTabClassName
						} ${
							disabled ? disabledTabClassName : undisabledTabClassName
						} ${tabClassName}`,
						}),
					}}
					value={4}
					disabled
					>
					Delete
					</Tab>
				</TabsList>
				<TabPanel className="w-full" value={1}>
					<CustomEntityCreate />
				</TabPanel>
				<TabPanel className="w-full" value={2}>
					Read
				</TabPanel>
				<TabPanel className="w-full" value={3}>
					Update
				</TabPanel>
				<TabPanel className="w-full" value={3}>
					Delete
				</TabPanel>
			</Tabs>
		</BaseLayout>
	);
}
