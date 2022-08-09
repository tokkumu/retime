# Retime
A tool to easily retime YouTube videos.
## Directions
Visit the [page](https://nick-ncsu.github.io/retime) to get started.

### Framerate
When on a YouTube video you can right click on the video and select "Stats for nerds".
You can then look under the section labelled "Current / Optimal Res" which contains the framerate on the far right.
Example: "Current / Optimal Res1920x1080@60 / 1920x1080@60" The video framerate is the number after 1920x1080@ (60fps).

### Modifier
This is an offset you can set in seconds. 
Example: If the real start frame is at 1.000s but you copied the debug info 1.35s (at 2.350s) later you can set an offset of 1.35 to lower the start time by 1.35s.

### Start Frame / End Frame
When on a YouTube video you can use the , and . keys on your keyboard to move forward and backwards by 1 frame at a time.
When you are on the start or end frame respectively, you can right click the video and select "Copy debug info". You then paste this whole string into the field.

### Format 
Auto-generated format which can use fields \<start>, \<end>, \<total>, and \<framerate>.
Example: 
```
Mod note: Time starts at <start> and ends at <end>, at <framerate> fps.
Retimed using https://nick-ncsu.github.io/retime/
```
Can become:
```
Mod note: Time starts at 00:00:00.667 and ends at 00:02:07.700, at 60 fps.
Retimed using https://nick-ncsu.github.io/retime/
```
## Credits
* [Nick-NCSU](https://github.com/Nick-NCSU) Developer and designer
* [Slush Puppy](https://github.com/Slush0Puppy) design adapted from [Slush Puppy's Retime Tool](https://github.com/Slush0Puppy/retime)
