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

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class StreamGobbler extends Thread
{
	private InputStream in;
	private OutputStream out;

	public StreamGobbler(InputStream in, OutputStream out)
	{
		this.in = in;
		this.out = out;
	}
	
	@Override
	public void run()
	{
		byte[] buffer = new byte[8192];

		try
		{
			for(;;)
			{
				if(Thread.interrupted())
				{
					break;
				}
				
				int count = in.read(buffer);
				
				if(count < 0)
				{
					break;
				}
				
				if(count > 0 && out != null)
				{
					out.write(buffer, 0, count);
				}
			}
		}
		catch(IOException ex)
		{
			ex.printStackTrace();
		}
	}
}
