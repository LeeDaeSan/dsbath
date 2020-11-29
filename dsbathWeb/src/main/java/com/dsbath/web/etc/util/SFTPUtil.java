package com.dsbath.web.etc.util;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

public class SFTPUtil {

	@Value("${sftp.host}")
	private String host;
	@Value("${sftp.id}")
	private String id;
	@Value("${sftp.password}")
	private String password;
	@Value("${sftp.port}")
	private Integer port;
	@Value("${sftp.filepath}")
	private String filePath;
	
	private JSch jsch = null;
	private Session session = null;
	private Channel channel = null;
	private ChannelSftp channelSFTP = null;
	
	/**
	 * SFTP server 접속 연결
	 * 
	 * @throws JSchException
	 */
	public void connect () throws JSchException {
	
		// JSch 생성
		jsch = new JSch();
		// Session 객체 생성
		session = jsch.getSession(id, host, port);
		// Session 비밀번호 설정
		session.setPassword(password);
		// 접속
		session.connect();
		
		// sftp open
		channel = session.openChannel("sftp");
		// sftp 채널 연결
		channel.connect();
		// 채널을 FTP용 채널로 캐스팅
		channelSFTP = (ChannelSftp) channel;
	}
	
	/**
	 * SFTP server 접속 해제
	 * 
	 */
	public void disconnect () {
		
		if (session.isConnected()) {
			// FTP 채널 접속 해제
			channelSFTP.disconnect();
			// SFTP 채널 접속 해제
			channel.disconnect();
			// session 해제 
			session.disconnect();
		}
	}
	
	public void download () throws JSchException {
		
	}
}
