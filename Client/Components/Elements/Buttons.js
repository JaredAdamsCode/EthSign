import React from "react";

import {Button} from "@material-ui/core";

export const PrimaryButton = props => {
	return(
		<Button
			color={"primary"}
			variant={"contained"}
			size={"large"}
			{...props}
		>
			{props.text}
		</Button>
	);
};

export const LinkPrimaryButton = props => <PrimaryButton {...props} />;

export const UploadButton = props =>
{
	return(
		<Button
			color={"primary"}
			variant={"contained"}
			size={"large"}
			component={"label"}
		>
			{props.text}
			<input
				type="file"
				accept={props.accept}
				style={{ display: "none" }}
				onChange={props.onClick}
			/>
		</Button>
	)
};
