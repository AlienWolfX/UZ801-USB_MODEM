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

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.text.MessageFormat;

public class AdbHelper
{
	private Config config;
	
	public AdbHelper(Config config)
	{
		this.config = config;
	}
	
	private void executeShellCommand(String cmd)
	{
		executeShellCommand(cmd, null);
	}
	
	private void executeShellCommand(String cmd, OutputStream out)
	{
		executeCommand("shell " + cmd, out);
	}
	
	private void executeCommand(String cmd, OutputStream out)
	{
		String cmdLine = config.getAdbCommand() + " " + cmd;
		
		Process p;
		
		try
		{
			p = Runtime.getRuntime().exec(cmdLine);
		}
		catch(IOException ex)
		{
			ex.printStackTrace();
			return;
		}
		
		StreamGobbler outReader = new StreamGobbler(p.getInputStream(), out);
		StreamGobbler errReader = new StreamGobbler(p.getErrorStream(), null);
		
		outReader.start();
		errReader.start();
		
		try
		{
			if(out != null)
			{
				p.waitFor();
				outReader.join();
			}
		}
		catch(InterruptedException ex)
		{
			Thread.currentThread().interrupt();
			return;
		}
	}
	
	public void sendClick(int x, int y)
	{
		System.out.println("Click at: " + x + "/" + y);
		executeShellCommand(MessageFormat.format("input tap {0,number,#####} {1,number,#####}", x, y));
	}

	public void sendText(String text)
	{
		executeShellCommand(MessageFormat.format("input text {0}", text));
	}
	
	public void sendKey(AndroidKey key)
	{
		executeShellCommand(MessageFormat.format("input keyevent {0}", key.getCode()));
	}
	
	public void screenshot(File target)
	{
		String fileName = config.getPhoneImageFilePath();
		
		executeShellCommand(MessageFormat.format("screencap -p {0}", fileName), new ByteArrayOutputStream());
		executeCommand(MessageFormat.format("pull {0} {1}", fileName, target.getAbsolutePath()), new ByteArrayOutputStream());
	}

	public void sendSwipe(int downX, int downY, int upX, int upY)
	{
		System.out.println("Swipe from " + downX + "/" + downY + " to " + upX + "/" + upY);
		executeShellCommand(MessageFormat.format("input swipe {0,number,#####} {1,number,#####} {2,number,#####} {3,number,#####}", downX, downY, upX, upY));
	}
}
