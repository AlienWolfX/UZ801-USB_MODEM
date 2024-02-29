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

import java.awt.BorderLayout;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.swing.JFrame;

public class AdbControl extends JFrame
{
	public AdbControl(File configFile) throws IOException
	{
		Config config = new Config();
		
		try(FileInputStream in = new FileInputStream(configFile))
		{
			config.load(in);
		}
		
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setTitle("ADB Control");
		setSize(720 / 3, 1080 / 3);
		
		AdbControlPanel panel = new AdbControlPanel(config);
		panel.setAdbHelper(new AdbHelper(config));
		getContentPane().add(panel, BorderLayout.CENTER);
	}

	public static void main(String[] args)
	{
		File configFile;
		
		if(args.length == 0)
		{
			configFile = new File("config.properties");
		}
		else
		{
			configFile = new File(args[0]);
		}

		try
		{
			AdbControl frame = new AdbControl(configFile);
			frame.setVisible(true);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
	}
}
