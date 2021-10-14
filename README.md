# Landing Page Project

## Table of Contents

* [Description](#description)
* [Usage](#usage)
* [Dependencies](#dependencies)
* [Functions](#functions)
* [Limitations](#limitations)



## Description

This project is a landing page done to demonstrate the usage of DOM, Events, as well as other JavaScript functionality.

The navigation bar obtains data dynamically using the section headers to populate the bar.

In addition, the navigation bar scrolls to sections on click and a different style was used in order to distinguish the active server from non-active ones.

## Usage

The landing page can be used as homepage of a website which would have the main content just on a single page instead of having a different page for each section.

## Dependencies

Other than the files in the directory of the project, there are no dependencies.

## Functions

### buildNavBar

This function builds the navigation bar based on the available sections.
This function populates 2 arrays which are the *sectionName* and *sectionID* which are based on the **nav** tag and the **ID** of the section tag.

After extracting the data, events were created for each new navigation element in order to scroll to the correct Section.

### activeNav

This function sets navbar elements to active/inactive based on scroll/click. It calls a smaller function [*modifyNav*](#modifynav).

### sectionActive

This function checks which Section should be active based on which Section is closest from the current viewport.

This function calculates and obtains the minimum offset from the viewport and sets the Section with this offset to active using [*changeClass*](#changeclass) function.

### hideShowNav

This function deals with the visiblity/invisibility of the navigation bar based on the delay obtained from the last time the page was scrolled.

However, this function has potential limitations. Whenever a scroll event is recorded, the timeout to making the bar invisible starts. When a scroll is made, multiple events are recorded which would make the timeout function get called many times in one scroll.

### scrollButton

This function deals the scroll button which scrolls the page to the top when it is clicked.

The button appears whenever the current *YOffset* is greater than the page height and disappears otherwise.

### collapseSection

This function allows every section to collapse/expand when clicked on.

This function only works on paragraph tags. If all *div*s of a section was hid instead, the title of the section would also collapse.

### changeClass

This function is called when a specific element is chosen to be actve and the rest unactive based on the equality of both variables.

This is used to change the classes of sections and navigation bars. A helper function that is

### modifyNav

This changes the active class of a nav element based on the corresponding active section.

Also a helper function.

## Limitations

Scroll button provides smooth transition to the top while the navigation bar elements do not. This is probably because the sections are linked using *href*.

When a scroll is made, multiple timeout instances are initiated because alot of events are recorded. This is why sometimes the navigation bar instantly disappears after scrolling is stopped.

All elements below the Section name are assumed to be parapgraphs. If there was another different element such as *h2*, it would not collapse with other elements.