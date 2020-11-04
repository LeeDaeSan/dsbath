package com.dsbath.admin.controller.rest;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dsbath.admin.etc.util.DateUtil;
import com.dsbath.admin.etc.util.ResponseUtil;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

@RestController
@RequestMapping("/file/rest")
public class FileRestController {

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
	
	@PostMapping(value = "/upload")
	public Map<String, Object> upload (@RequestParam("file") MultipartFile file, HttpServletResponse response) {
		Map<String, Object> resultMap = null;
		
		JSch jsch = new JSch();
		
		Session session = null;
		Channel channel = null;
		ChannelSftp sftp = null;
		
		FileInputStream in = null;
		
		try {
			resultMap = ResponseUtil.successMap();
			
			in = (FileInputStream) file.getInputStream();
			
			String [] fileNames = file.getOriginalFilename().split("\\.");
			String fileName = fileNames[0] + DateUtil.fileTime() + "." + fileNames[1]; 
			// 설정
			Properties config = new Properties();
			config.put("StrictHostKeyChecking", "no");
			
			// 세션 정보 설정
			session = jsch.getSession(id, host, port);
			session.setConfig(config);
			session.setPassword(password);
			
			// 세션 연결
			session.connect();
			
			// 채널 설정
			channel = session.openChannel("sftp");
			// 채널 연결
			channel.connect();
			
			// sftp 캐스팅
			sftp = (ChannelSftp) channel;
			
			// 경로 이동
			sftp.cd(filePath + "/tmp");
			sftp.put(in, fileName);
			
			// 채널 연동 해제
			channel.disconnect();
			// 세션 연동 해제
			session.disconnect();
			// inputstream 해제
			in.close();
			
			resultMap.put("fileName", fileName);
			
		} catch (SftpException e) {
			e.printStackTrace();
			resultMap = ResponseUtil.failureMap();
		} catch (JSchException e) {
			e.printStackTrace();
			resultMap = ResponseUtil.failureMap();
		} catch (IOException e) {
			e.printStackTrace();
			resultMap = ResponseUtil.failureMap();
		} catch (Exception e) {
			e.printStackTrace();
			resultMap = ResponseUtil.failureMap();
		} finally {
			
			// 채널 close
			if (channel != null) { channel.disconnect(); }
			// 세션 close
			if (session != null) { session.disconnect(); }
			// sftp close
			if (sftp != null) { sftp.disconnect(); }
			// inputstream close
			if (in != null) {
				try { in.close(); } catch (Exception e2) { }
			}
		}
		return resultMap;
	}
	
	@GetMapping(value = "/download")
	public void download (
			@RequestParam(value = "fileName", required = false) String fileName,
			@RequestParam(value = "type", required = false) String type,
			HttpServletResponse response) throws Exception {
		
		JSch jsch = new JSch();
		
		InputStream in = null;
		try {
			// 설정
			Properties config = new Properties();
			config.put("StrictHostKeyChecking", "no");
			
			// 세션 정보 설정
			Session session = jsch.getSession(id, host, port);
			session.setConfig(config);
			session.setPassword(password);
			
			// 세션 연결
			session.connect();
			
			// 채널 설정
			Channel channel = session.openChannel("sftp");
			// 채널 연결
			channel.connect();
			
			// sftp 캐스팅
			ChannelSftp sftp = (ChannelSftp) channel;
			
			// 경로 이동
			sftp.cd(filePath + "/tmp");
			// input 파일
			in = sftp.get(fileName);
			// 파일 -> response로 복사
			IOUtils.copy(in, response.getOutputStream());
			
			// 채널 연동 해제
			channel.disconnect();
			// 세션 연동 해제
			session.disconnect();
			// inputstream 해제
			in.close();
			
			// response 설정
			response.getOutputStream().close();
			response.flushBuffer();
			
		} catch (SftpException e) {
		} catch (JSchException e) {
		} catch (IOException e) {
		} catch (Exception e) {
			
		} finally {
			if (in != null) {
				try { in.close(); } catch (Exception e2) { }
			}
		}
	}
}
