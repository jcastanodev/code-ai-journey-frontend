import React, { useLayoutEffect, useRef, useState } from "react";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "@store/hooks";
import { signInAccount } from "@store/reducers/accountReducer";
import { SignInRequestInterface } from "@interfaces/account/SignInRequestInterface";
import { logger } from "@utils/logger";
import { CustomButton } from "@components/common/material-ui/CustomButton";
import { CustomCheckbox } from "@components/common/material-ui/CustomCheckbox";
import { CustomInput } from "@components/common/material-ui/CustomInput";

type SignInFormProps = {
	unauthorizedRoute?: string;
};

export function ConnectFour() {
	const ref = useRef(null);
  
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		const { currentWidth, currentHeight } = ref.current;
		setWidth(currentWidth);
	  setHeight(currentHeight);
	}, []);

	return (
		<div ref={ref} className="row">
			<div className="col-">
			</div>
		</div>
	);
}
