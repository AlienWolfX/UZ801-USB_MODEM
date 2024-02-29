/*******************************************************************************
 * Copyright (c) 2014 Marian Schedenig
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Marian Schedenig - initial API and implementation
 *******************************************************************************/
package name.schedenig.adbcontrol;

public enum AndroidKey
{
	MENU(1),
	HOME(3),
	BACK(4),
	DPAD_UP(19),
	DPAD_DOWN(20),
	DPAD_LEFT(21),
	DPAD_RIGHT(22),
	DPAD_CENTER(23),
	VOLUME_UP(24),
	VOLUME_DOWN(25),
	POWER(26),
	CAMERA(27),
	CLEAR(28),
	COMMA(55),
	PERIOD(56),
	ALT_LEFT(57),
	ALT_RIGHT(58),
	SHIFT_LEFT(59),
	SHIFT_RIGHT(60),
	TAB(61),
	SPACE(62),
	ENTER(66),
	DEL(67),
	FOCUS(80),
	//MENU(82),
	NOTIFICATION(83),
	SEARCH(84);
	
	private int code;

	private AndroidKey(int code)
	{
		this.code = code;
	}
	
	public int getCode()
	{
		return code;
	}
}
