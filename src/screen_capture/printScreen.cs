using System;
using System.Runtime.InteropServices;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections;
using System.Collections.Generic;
using Microsoft.VisualBasic;

/// Provides functions to capture the entire screen, or a particular window, and save it to a file.

public class ScreenCapture{

  static String deviceName = "";
  static Image capturedImage = null;

  /// Creates an Image object containing a screen shot of the entire desktop

  public Image CaptureScreen(){
    if (windowNumber == -1){
      return CaptureWindow(new IntPtr(0));
      if (capturedImage != null){
        return capturedImage;
      }
      Console.WriteLine("Unable to capture image... using main display");
    }
    return CaptureWindow(new IntPtr(windowNumber));
  }

  /// Creates an Image object containing a screen shot of a specific window

  private Image CaptureWindow(IntPtr handle){
    // get te hDC of the target window
    IntPtr hdcSrc = User32.GetWindowDC(handle);
    // get the size
    User32.RECT windowRect = new User32.RECT();
    User32.GetWindowRect(handle, ref windowRect);

    Image img = CaptureWindowFromDC(handle, hdcSrc, windowRect);
    User32.ReleaseDC(handle, hdcSrc);
    return img;
  }
  private static Image CaptureWindowFromDC(IntPtr handle, IntPtr hdcSrc, User32.RECT windowRect){
    // get the size
    int width = windowRect.right - windowRect.left;
    int height = windowRect.bottom - windowRect.top;
    Console.WriteLine(width);
    Console.WriteLine(height);
    // create a device context we can copy to
    IntPtr hdcDest = GDI32.CreateCompatibleDC(hdcSrc);
    // create a bitmap we can copy it to,
    // using GetDeviceCaps to get the width/height
    IntPtr hBitmap = GDI32.CreateCompatibleBitmap(hdcSrc, width, height);
    // select the bitmap object
    IntPtr hOld = GDI32.SelectObject(hdcDest, hBitmap);
    // bitblt over
    GDI32.BitBlt(hdcDest, 0, 0, width, height, hdcSrc, 0, 26, GDI32.SRCCOPY);
    // restore selection
    GDI32.SelectObject(hdcDest, hOld);
    // clean up
    GDI32.DeleteDC(hdcDest);
    // get a .NET image object for it
    Image img = Image.FromHbitmap(hBitmap);
    // free up the Bitmap object
    GDI32.DeleteObject(hBitmap);
    return img;
  }

  public void CaptureScreenToFile(string filename, ImageFormat format){
    Image img = CaptureScreen();
    img.Save(filename, format);
  }

  static String file = "screenshot.png";
  static System.Drawing.Imaging.ImageFormat format = System.Drawing.Imaging.ImageFormat.Bmp;
  static int windowNumber = -1;
  static List<MonitorInfoWithHandle> _monitorInfos;

  static void parseArguments(){
    String[] arguments = Environment.GetCommandLineArgs();
    if (arguments.Length < 2){
      Environment.Exit(0);
    }

    windowNumber = Int32.Parse(arguments[1]);

    if (arguments.Length < 3){
      return;
    }

    file = arguments[2];
    Dictionary<String, System.Drawing.Imaging.ImageFormat> formats =
    new Dictionary<String, System.Drawing.Imaging.ImageFormat>();

    formats.Add("bmp", System.Drawing.Imaging.ImageFormat.Bmp);
    formats.Add("emf", System.Drawing.Imaging.ImageFormat.Emf);
    formats.Add("exif", System.Drawing.Imaging.ImageFormat.Exif);
    formats.Add("jpg", System.Drawing.Imaging.ImageFormat.Jpeg);
    formats.Add("jpeg", System.Drawing.Imaging.ImageFormat.Jpeg);
    formats.Add("gif", System.Drawing.Imaging.ImageFormat.Gif);
    formats.Add("png", System.Drawing.Imaging.ImageFormat.Png);
    formats.Add("tiff", System.Drawing.Imaging.ImageFormat.Tiff);
    formats.Add("wmf", System.Drawing.Imaging.ImageFormat.Wmf);


    String ext = "";
    if (file.LastIndexOf('.') > -1) {
      ext = file.ToLower().Substring(file.LastIndexOf('.') + 1, file.Length - file.LastIndexOf('.') - 1);
    }
    else {
      Console.WriteLine("Invalid file name - no extension");
      Environment.Exit(7);
    }

    try {
      format = formats[ext];
    }
    catch (Exception e){
      Console.WriteLine("Probably wrong file format:" + ext);
      Console.WriteLine(e.ToString());
      Environment.Exit(8);
    }

    return;
  }

  public static void Main(){
    parseArguments();
    ScreenCapture sc = new ScreenCapture();

    try {
      if (windowNumber != -1){
        Console.WriteLine("Taking a capture of the application screen to " + file);
        sc.CaptureScreenToFile(file, format);
      }
    }
    catch (Exception e){
      Console.WriteLine("Check if file path is valid " + file);
      Console.WriteLine(e.ToString());
    }
  }

  /// Helper class containing Gdi32 API functions

  private class GDI32{
    public const int SRCCOPY = 0x00CC0020; // BitBlt dwRop parameter
    [DllImport("gdi32.dll")]
    public static extern bool BitBlt(IntPtr hObject, int nXDest, int nYDest,
      int nWidth, int nHeight, IntPtr hObjectSource,
      int nXSrc, int nYSrc, int dwRop);
    [DllImport("gdi32.dll")]
    public static extern IntPtr CreateCompatibleBitmap(IntPtr hDC, int nWidth,
      int nHeight);
    [DllImport("gdi32.dll")]
    public static extern IntPtr CreateCompatibleDC(IntPtr hDC);
    [DllImport("gdi32.dll")]
    public static extern bool DeleteDC(IntPtr hDC);
    [DllImport("gdi32.dll")]
    public static extern bool DeleteObject(IntPtr hObject);
    [DllImport("gdi32.dll")]
    public static extern IntPtr SelectObject(IntPtr hDC, IntPtr hObject);
  }

  /// Helper class containing User32 API functions

  public class User32{
    [StructLayout(LayoutKind.Sequential)]
    public struct RECT{
      public int left;
      public int top;
      public int right;
      public int bottom;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct POINT{
      public int x;
      public int y;
    }

    [DllImport("user32.dll")]
    public static extern IntPtr GetDC(IntPtr hWnd);
    [DllImport("user32.dll")]
    public static extern IntPtr GetDesktopWindow();
    [DllImport("user32.dll")]
    public static extern IntPtr GetWindowDC(IntPtr hWnd);
    [DllImport("user32.dll")]
    public static extern IntPtr ReleaseDC(IntPtr hWnd, IntPtr hDC);
    [DllImport("user32.dll")]
    public static extern IntPtr GetWindowRect(IntPtr hWnd, ref RECT rect);
    [DllImport("user32.dll")]
    public static extern IntPtr GetClientRect(IntPtr hWnd, ref RECT rect);
    [DllImport("user32.dll")]
    public static extern IntPtr ClientToScreen(IntPtr hWnd, ref POINT point);
    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct MONITORINFOEX{
      public uint size;
      public RECT Monitor;
      public RECT WorkArea;
      public uint Flags;
      [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 32)]
      public string DeviceName;
    }

    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    public static extern bool GetMonitorInfo(IntPtr hMonitor, ref MONITORINFOEX lpmi);

    public delegate bool MonitorEnumDelegate(IntPtr hMonitor, IntPtr hdcMonitor, ref RECT lprcMonitor, IntPtr dwData);

    [DllImport("user32.dll")]
    public static extern bool EnumDisplayMonitors(IntPtr hdc, IntPtr lprcClip, MonitorEnumDelegate lpfnEnum, IntPtr dwData);
  }

  private class MonitorInfoWithHandle{
    public IntPtr MonitorHandle { get; private set; }
    public User32.MONITORINFOEX MonitorInfo { get; private set; }
    public MonitorInfoWithHandle(IntPtr monitorHandle, User32.MONITORINFOEX monitorInfo){
      MonitorHandle = monitorHandle;
      MonitorInfo = monitorInfo;
    }
  }

}