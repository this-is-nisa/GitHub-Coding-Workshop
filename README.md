# 🦖 Yoshi's JavaScript Adventure: WIECS Workshop Edition

Welcome to the **Women in Engineering and Computer Science (WIECS)** GitHub/Coding Workshop! 

---

## 🛠 Step 0: Claim Your Project (Forking)

Before you start, you need your own copy of the game to work on:
1.  Look at the top-right of this GitHub page and click the **Fork** button.
2.  This creates a copy of the project under your own GitHub account. **Make sure you are working on your fork!**

---

## 🚀 Getting Started: Choose Your Path

Now that you have your own copy, you need to set up your workspace. You can work entirely in your **browser** (easiest) or on your **local computer**.

### Option A: GitHub Codespaces (Browser-Based)
*Best if you want to start instantly without installing anything.*
1. Click the green **Code** button on **your forked repo** and select the **Codespaces** tab.
2. Click **Create codespace on main**.
3. **Install Live Server:** Click the **Extensions** icon on the left (4 squares), search for `Live Server` by **Ritwick Dey**, and hit **Install**.
4. **Go Live:** Click the **Go Live** button at the very bottom-right of your screen. A new tab will open with your game!

### Option B: Local VS Code (Desktop)
*Best if you already have VS Code installed and want to work locally.*
1. **Clone your fork:** Open your terminal and type `git clone [YOUR_FORK_URL]`.
2. **Open in VS Code:** File > Open Folder > Select your project.
3. **Install Live Server:** Go to the **Extensions** tab and install `Live Server` by **Ritwick Dey**.
4. **Go Live:** Right-click `index.html` and select **Open with Live Server**.

---

## 🛠 The Engineering Workflow (Git)

In professional engineering, we don't just "Save" files—we **Commit** them. This creates a timeline of your work so you can experiment without fear! After every Sprint today, follow this 3-step rhythm in your terminal:

1. **Stage it:** `git add .`
2. **Snapshot it:** `git commit -m "Sprint X Complete: [Describe your work]"`
3. **Share it:** `git push`

---
## 👩‍💻 The Development Sprints
This workshop is divided into **6 Sprints**. After you complete the code for each challenge, you must **Commit** and **Push** your changes to GitHub to "save" your progress in the cloud.

### Sprint 1: The Architect
**Goal:** Data Structures & World Building.
- Locate the `levels` array in `script.js`.
- **Task:** Design Level 3, 4, and 5 using the grid system (0=Sky, 1=Brick, 2=[?], 3=Goomba, 4=Goal).
- *Git Check:* `git commit -m "feat: design all 5 levels"`

### Sprint 2: UI Synchronization
**Goal:** DOM Manipulation.
- Find the `loadLevel` function. 
- **Task:** Write the code to update the HTML `innerText` for the Level Number and the Player's Score.
- *Git Check:* `git commit -m "feat: connect game data to HUD"`

### Sprint 3: World Boundaries
**Goal:** Conditional Logic (The "Pit" Check).
- Find the `update` function.
- **Task:** Program a check to see if Yoshi's `y` position is greater than the `canvas.height`. If so, trigger the Game Over state.
- *Git Check:* `git commit -m "fix: implement pit death logic"`

### Sprint 4: The Solid World (4-Way Collision)
**Goal:** Make the world feel physical. Right now, Yoshi is a ghost who can walk through walls and ceilings!
* **Task 1 (The Head-Butt):** If Yoshi hits a block from below (`player.vY < 0`), make him bounce down. If the block `type` is an `item`, use `platforms.splice(i, 1)` to delete it and add 50 points to the score!
* **Task 2 (The Right Wall):** Use Yoshi's velocity (`vX > 0`) to detect if he is hitting a wall to his right. 
    * **The Buffer:** Add the "Feet Buffer" (`player.y + player.h > p.y + 5`) AND the "Ghost Head" check (`player.y < p.y + tileSize - 15`) so his head can overlap the bottom of blocks while walking.
* **Task 3 (The Left Wall):** Use Yoshi's velocity (`vX < 0`) to detect if he is hitting a wall to his left.
    * **The Mirror:** Apply the same "Feet" and "Ghost Head" buffers here so Yoshi moves smoothly in both directions.
* **Task 4 (The Snap):** When a collision is detected, "snap" Yoshi to the edge of the block (e.g., `player.x = p.x - player.w`) so he doesn't get stuck inside the bricks.
**Git Check:**
1. git add .
2. git commit -m "Sprint 4: Implemented 4-way collision with ghost head buffers"
3. git push origin main

### Sprint 5: Stomp or Die
**Goal:** Complex Physics Logic.
- **Task:** Program the enemy collision. If Yoshi lands on a Goomba's head, he should bounce and get points. If he hits them from the side, he loses.
- *Git Check:* `git commit -m "feat: implement enemy stomp system"`

### Sprint 6: Progression System
**Goal:** Level State Management.
- **Task:** Detect when Yoshi touches the Goal (Flagpole). Increment the `currentLevel` and reload the world.
- *Git Check:* `git commit -m "feat: complete level progression system"`

---

## 🎨 Asset Credits
- **Yoshi Sprite:** [PNGAll - Yoshi](https://www.pngall.com/wp-content/uploads/11/Yoshi-PNG-Images.png)
- **Enemy Sprite:** [PNGMart - Goomba](https://www.pngmart.com/files/23/Goomba-PNG-Photo.png)
- **Question Sprite** [melonDS Community - BlockBoy](https://melonds.kuribo64.net/board/userpic/397_1573947385.png)
- **Brick:** [FreePNGImg - Mario Tiles](https://freepngimg.com/thumb/brick/90535-mario-square-super-bros-brown-free-photo-png.png)

---
**Happy Coding, Engineers!** 🚀
